<template>
  <button
    type="button"
    class="btn-actions"
    :class="typeBtn"
    :disabled="disabled"
  >
    <Icon :name="icon" />
  </button>
</template>

<script setup lang="ts">
import Icon, { type TIconNames } from "./Icon.vue";

interface Props {
  typeBtn?: "default" | "success" | "info" | "error";
  disabled?: boolean;
  icon: TIconNames;
}

withDefaults(defineProps<Props>(), {
  typeBtn: "default",
  icon: "ChevronRight",
  disabled: false,
});
</script>

<style lang="postcss" scoped>
.btn-actions {
  @apply w-[30px] h-[30px] p-[7px] flex items-center justify-center rounded-lg;
  transition: all 0.3s ease-out;

  &:hover {
    opacity: 0.75;
    transition: all 0.3s ease-out;

    &:not([disabled]) {
      transform: scale(1.15);
    }
  }

  &:disabled {
    @apply opacity-50;
  }
}

.default {
  @apply border border-gray-200;
}

.success {
  @apply bg-[#E7FDF9] text-[#006751];
}

.info {
  @apply bg-[#F0F5FF] text-[#0076D6];
}

.error {
  @apply bg-[#FFF5F5] text-[#F9346F];
}
</style>
