<template>
  <div class="order-card">
    <div class="order-card__header">
      <div class="header-detail">
        <p class="name" :title="client">{{ truncate(client, 10) }}</p>
        <p class="order-id">ID de orden: {{ orderId }}</p>
      </div>
      <Chip label="Enviado" type="success" size="small" />
    </div>

    <div class="rounded-dashes-total"></div>
    <div class="order-card__content">
      <div>
        <p v-for="(item, index) in visibleItems" :key="index" class="item-name">
          {{ item.quantity }}x {{ truncate(item.name, 20) }}
        </p>
        <p
          v-if="items.length > 5"
          class="flex items-center !h-1 !text-2xl text-start"
        >
          ...
        </p>
      </div>
      <div class="mt-auto flex items-center justify-between">
        <span>Total:</span>
        <span>$ {{ total }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed, toRefs } from "vue";
import Chip from "./Chip.vue";

interface IItem {
  name: string;
  quantity: number;
}

interface IProps {
  client: string;
  orderId: string;
  status: string;
  items: IItem[];
  total: number;
}

const truncate = (text: string, maxLength: number): string => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

const props = defineProps<IProps>();

const { items } = toRefs(props);

const visibleItems = computed(() => items.value.slice(0, 4));
</script>

<style lang="postcss" scoped>
.order-card {
  @apply min-w-56 min-h-56 max-w-56 max-h-56 p-4 grid grid-rows-[50px_2px_auto] gap-1 bg-white border rounded-xl shadow-sm;
}

.order-card__header {
  @apply grid grid-cols-[1fr_auto];
}

.header-detail {
  .name {
    @apply text-lg font-bold;
  }

  .order-id {
    @apply text-sm text-gray-400;
  }
}

.order-card__content {
  @apply grid grid-rows-[1fr_20px] text-gray-400;

  p,
  span {
    @apply text-sm;
  }

  .text-gray-500 {
    @apply text-center italic;
  }
}

.rounded-dashes-total {
  --s: 1px;
  --c: #92a1b58a;
  --_g: var(--s) top 50%, var(--c) calc(100% - 1px), #0000;

  height: var(--s);
  width: 100%;

  background: 0 / calc(15 * var(--s)) space no-repeat;
  background-image: radial-gradient(circle closest-side at left var(--_g)),
    radial-gradient(circle closest-side at right var(--_g)),
    linear-gradient(90deg, #0000 25%, var(--c) 0 75%, #0000 0);
}
</style>
