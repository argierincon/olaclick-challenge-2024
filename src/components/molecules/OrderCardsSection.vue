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
        :key="index"
        :client="order.client"
        :orderId="order.orderId"
        :status="order.status"
        :items="order.items"
        :total="order.total"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import OrderCard from "../atoms/OrderCard.vue";

interface IItem {
  name: string;
  quantity: number;
}

interface IOrder {
  client: string;
  orderId: number;
  status: string;
  items: IItem[];
  total: number;
}

interface IProps {
  ordersList: IOrder[];
}

defineProps<IProps>();
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
