<template>
  <section class="p-3 bg-white rounded-xl">
    <Table :tableData="data" />
    <OrderCardsSection />
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useGlobalStore } from "../store";
import { storeToRefs } from "pinia";

import OrderCardsSection from "../components/molecules/OrderCardsSection.vue";
import Table from "../components/organisms/Table.vue";

const globalStore = useGlobalStore();

const data = ref();
const isLoading = ref<boolean>(false);

const getOrdersData = async () => {
  try {
    isLoading.value = true;
    await globalStore.getOrders();
    data.value = globalStore.ordersList;
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

const { tablePage, tableLimit } = storeToRefs(globalStore);
watch(tableLimit, () => {
  getOrdersData();
});
watch(tablePage, () => {
  getOrdersData();
});

onMounted(() => {
  getOrdersData();
});
</script>
