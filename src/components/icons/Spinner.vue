<template>
  <svg
    viewBox="0 0 24 24"
    class="icon animate-spin -ml-1 h-5 w-5"
    v-bind="$attrs"
    :width="size"
    :height="size"
    xmlns="http://www.w3.org/2000/svg"
    :color="color"
  >
    <circle
      class="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      stroke-width="4"
    ></circle>
    <path
      class="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
</template>

<script setup lang="ts">
// el type es una característica reciente de TypeScript (desde la versión 4.5) que permite mejorar la claridad del código y evitar confusiones cuando se importan tanto tipos como valores.
import { type IIconProps, defaultIconProps } from "../../interfaces/IIconProps";

withDefaults(defineProps<IIconProps>(), defaultIconProps);
</script>

<style scoped>
.icon {
  display: inline-block;
}
</style>
