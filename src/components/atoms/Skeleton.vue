<template>
  <div :class="skeletonClasses"></div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface ISkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
}

const props = withDefaults(defineProps<ISkeletonProps>(), {
  width: "100%",
  height: "20px",
  borderRadius: "100px",
});

const skeletonClasses = computed(() => [
  "skeleton",
  {
    [`w-[${props.width}]`]: props.width,
    [`h-[${props.height}]`]: props.height,
    [`rounded-[${props.borderRadius}]`]: props.borderRadius,
  },
]);
</script>

<style lang="postcss" scoped>
.skeleton {
  @apply w-full h-[20px] rounded-[100px];
  background: linear-gradient(
    90deg,
    rgba(98, 98, 98, 0.06) 25%,
    rgba(98, 98, 98, 0.15) 37%,
    rgba(98, 98, 98, 0.06) 63%
  );
  background-size: 400% 100%;
  animation: skeleton-loading 1.4s infinite;
  animation-timing-function: ease;
}

@keyframes skeleton-loading {
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}
</style>
