<template>
  <button
    :class="['nav-button', { active: isActive }]"
    :disabled="disabled"
    @click="navigate"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";

interface IProps {
  path?: string;
  currentRoute: string;
  disabled?: boolean;
}

const props = defineProps<IProps>();

const router = useRouter();

const isActive = computed(() => props.currentRoute === props.path);

const navigate = () => {
  if (props.path && !props.disabled) {
    router.push(props.path);
  }
};
</script>

<style lang="postcss" scoped>
.nav-button {
  @apply flex items-center justify-start gap-3 w-full p-4 rounded-lg bg-white;
  @apply hover:bg-blue-50 hover:text-blue-700 transition-all duration-200;

  &.active {
    @apply bg-[#2D71F8] text-white;
  }

  &:disabled {
    @apply text-gray-400 cursor-not-allowed;
  }
}
</style>
