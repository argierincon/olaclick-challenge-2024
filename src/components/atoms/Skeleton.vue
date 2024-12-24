<template>
  <div :class="skeletonClasses" :style="skeletonStyle"></div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface ISkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
}

const props = withDefaults(defineProps<ISkeletonProps>(), {
  width: "100px",
  height: "20px",
  borderRadius: "100px",
});

const skeletonClasses = computed(() => [
  "skeleton",
  {
    [`rounded-[${props.borderRadius}]`]: props.borderRadius,
  },
]);

const skeletonStyle = computed(() => ({
  width: props.width,
  height: props.height,
  "border-radius": props.borderRadius,
}));
</script>

<style lang="postcss" scoped>
.skeleton {
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
