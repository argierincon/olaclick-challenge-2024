<template>
  <header class="header">
    <div class="flex items-center gap-x-4">
      <button class="bg-white rounded-full p-4">
        <Icon
          name="MenuBurger"
          size="24px"
          class="text-blue-500 hover:text-blue-300"
        />
      </button>

      <h3>Órdenes</h3>
    </div>

    <div class="flex items-center gap-4">
      <div
        class="flex items-center gap-3 py-3 px-4 rounded-full bg-white font-medium"
      >
        <p>{{ formattedDate }}</p>
        <span class="flex p-3 bg-[#F5F9FF] rounded-full text-blue-600">
          <Icon name="Calendar" />
        </span>
      </div>

      <div
        class="flex items-center gap-3 py-3 px-4 rounded-full bg-white font-medium"
      >
        <p>{{ formattedTime }}</p>
        <span class="flex p-3 bg-[#F5F9FF] rounded-full text-blue-600">
          <Icon name="Clock" />
        </span>
      </div>
      <!-- <button
        @click="onOpenOrder"
        class="px-4 py-2 bg-green-100 text-green-700 rounded"
      >
        Open Order
      </button>
      <span class="flex items-center gap-1">
        <div class="w-3 h-3 bg-green-500 rounded-full"></div>
        Online
      </span> -->
    </div>
  </header>
</template>

<style lang="postcss" scoped>
.header {
  @apply p-4 flex items-center justify-between;
}
</style>

<script setup lang="ts">
import Icon from "../atoms/Icon.vue";

defineProps<{
  onOpenOrder: () => void;
}>();

import { ref } from "vue";

const getFormattedDate = () => {
  const date = new Date();

  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  return date.toLocaleDateString("es-ES", options);
};

const formattedDate = ref(getFormattedDate());

const getFormattedTime = () => {
  const date = new Date();

  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  return date.toLocaleTimeString("en-US", options);
};

const formattedTime = ref(getFormattedTime());
</script>
