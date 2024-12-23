<template>
  <div
    class="tooltip-container"
    @mouseover="showTooltip"
    @mouseleave="hideTooltip"
  >
    <Icon name="Info" class="tooltip-icon" />
    <transition name="fade">
      <div v-if="isVisible" class="tooltip-content">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Icon from "./Icon.vue";

const isVisible = ref(false);

const showTooltip = () => {
  isVisible.value = true;
};

const hideTooltip = () => {
  isVisible.value = false;
};
</script>

<style lang="postcss" scoped>
.tooltip-container {
  @apply z-10;
  position: relative;
  display: inline-block;
}

.tooltip-icon {
  cursor: pointer;
}

.tooltip-content {
  @apply w-52 p-2 absolute  top-1/2 left-full font-medium text-sm;
  @apply rounded-md bg-black bg-opacity-75 -translate-y-1/2;
  @apply text-white whitespace-normal break-words pointer-events-none;
}

.fade-enter-active,
.fade-leave-active {
  transition: 0.3s ease-in-out, opacity 0.3s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  max-height: 500px;
  opacity: 1;
}
</style>
