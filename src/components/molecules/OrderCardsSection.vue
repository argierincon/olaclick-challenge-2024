<template>
  <section class="order-card-section">
    <h3 class="text-xl">Tracking de órdenes enviadas</h3>
    <div class="card-list">
      <div v-if="ordersList.length === 0" class="card-default">
        <p class="text-sm">No hay órdenes entregadas</p>
      </div>
      <OrderCard
        v-else
        v-for="(order, index) in ordersList"
        class="cursor-pointer"
        :key="index"
        :client="order.client"
        :orderId="order.orderId"
        :status="order.status"
        :items="order.items"
        :total="order.total"
        @click="navigateToOrder(order.uid, order.orderId)"
      />
    </div>
    <OrderDrawer :isDrawerVisible="showOrderDrawer" @close="closeDrawer" />
  </section>
</template>

<script setup lang="ts">
import { defineProps, ref, watch } from "vue";
import { useGlobalStore } from "../../store";
import { useRoute, useRouter } from "vue-router";

import OrderCard from "../atoms/OrderCard.vue";
import OrderDrawer from "../organisms/OrderDrawer.vue";

const globalStore = useGlobalStore();
const route = useRoute();
const router = useRouter();

interface IItem {
  name: string;
  quantity: number;
}

interface IOrder {
  client: string;
  uid: string;
  orderId: number;
  status: string;
  items: IItem[];
  total: number;
}

interface IProps {
  ordersList: IOrder[];
}

defineProps<IProps>();

const showOrderDrawer = ref(false);
const selectedOrderId = ref<number>(0);
const isLoading = ref(false);

const navigateToOrder = async (orderUid: string, orderId: number) => {
  try {
    console.log(orderId, orderUid);

    await globalStore.getOrderDetail(orderUid);

    showOrderDrawer.value = true;

    localStorage.setItem("currentOrderId", orderUid);
    selectedOrderId.value = orderId;

    router.push({ name: "OrderDetail", params: { id: Number(orderId) } });
  } catch (error) {
    console.error("Error al obtener el detalle de la orden:", error);
  } finally {
    isLoading.value = false;
  }
};

const closeDrawer = () => {
  showOrderDrawer.value = false;
  router.push("/");
};

watch(
  () => route.name,
  (newName) => {
    if (newName === "OrderDetail") {
      showOrderDrawer.value = true;
    } else {
      showOrderDrawer.value = false;
    }
  }
);
</script>

<style lang="postcss" scoped>
.order-card-section {
  @apply flex flex-col gap-y-4;
}

.card-list {
  @apply flex gap-4;
  overflow-x: auto;
  white-space: nowrap;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.order-card-section::-webkit-scrollbar {
  display: none;
}

.order-card {
  @apply w-56;
}

.card-default {
  @apply w-56 h-56 p-4 flex items-center justify-center bg-gray-100 rounded-xl shadow-sm;
}
</style>
