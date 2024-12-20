<template>
  <svg
    viewBox="0 0 24 24"
    class="icon"
    v-bind="$attrs"
    :width="size"
    :height="size"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.412 24L6 22.588L15.881 12.707C16.0685 12.5194 16.1738 12.2651 16.1738 12C16.1738 11.7348 16.0685 11.4805 15.881 11.293L6.017 1.43097L7.431 0.0169678L17.293 9.87897C17.8554 10.4416 18.1714 11.2045 18.1714 12C18.1714 12.7955 17.8554 13.5584 17.293 14.121L7.412 24Z"
      :fill="color"
    />
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
