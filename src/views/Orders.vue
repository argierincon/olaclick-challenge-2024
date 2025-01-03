<template>
  <section class="container">
    <div class="table-container">
      <Table :tableData="cleanedData" />
    </div>
    <div class="order-cards-section">
      <OrderCardsSection :ordersList="formatOrders" />
    </div>

    <Snackbar
      v-model:isSnackVisible="showSnack"
      :message="dataSnack.msg"
      :type="dataSnack.type"
      :duration="3000"
      @close="onClose"
    />
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useGlobalStore } from "../store";
import { storeToRefs } from "pinia";

import OrderCardsSection from "../components/molecules/OrderCardsSection.vue";
import Table from "../components/organisms/Table.vue";
import Snackbar from "../components/atoms/Snackbar.vue";

const globalStore = useGlobalStore();
const data: any = computed(() => globalStore.ordersData || []);

const isLoading = ref<boolean>(false);

const cleanData = (data: any[]) => {
  return data.map((order) => {
    const itemNames = order.items.map((item: any) => item.name);
    let detail = itemNames.slice(0, 3).join(" + ");

    if (itemNames.length > 3) {
      detail += "...";
    }

    const formattedTime = new Date(order.time)
      .toLocaleString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      .replace(",", "");

    return {
      ...order,
      detail,
      time: formattedTime,
      total: `$ ${order.total}`,
    };
  });
};

const cleanedData = computed(() => cleanData(data.value));

const getOrdersData = () => {
  try {
    isLoading.value = true;
    globalStore.getOrders();
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

const getLastFinishedOrders = () => {
  try {
    isLoading.value = true;
    globalStore.getRecentFinishedOrders();
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

const showSnack = ref(false);

const onClose = () => {
  showSnack.value = false;
};

const { tablePage, tableLimit } = storeToRefs(globalStore);
watch(tableLimit, () => {
  getOrdersData();
});
watch(tablePage, () => {
  getOrdersData();
});

const formatOrders = computed(() => {
  const orders = globalStore.lastFinishedOrders ?? [];

  return orders.map((order) => ({
    client: order.client,
    uid: order.uid,
    orderId: order.id,
    status: order.status,
    total: order.total,
    items: order.items.map((item) => ({
      name: item.name,
      quantity: item.quantity,
    })),
  }));
});

const dataSnack = computed(() => {
  let snackData = { msg: "", type: "" };

  const lastOrder = globalStore.lastOrderUpdated;

  if (!lastOrder) {
    showSnack.value = false;
  } else {
    showSnack.value = true;
    const statusMessage =
      lastOrder.status === "delivered" ? "Enviada" : "Entregada";
    const type = lastOrder.status === "delivered" ? "info" : "success";

    snackData = {
      msg: `La orden id ${lastOrder.id} del cliente ${lastOrder.client} ha sido ${statusMessage}`,
      type,
    };
  }

  return snackData;
});

onMounted(() => {
  getOrdersData();
  getLastFinishedOrders();
});
</script>

<style lang="postcss" scoped>
.container {
  @apply p-3 bg-white rounded-xl flex flex-col h-full;
}

.table-container {
  @apply flex-1 overflow-auto;
}

.order-cards-section {
  @apply max-h-[350px] overflow-auto;
}
</style>
