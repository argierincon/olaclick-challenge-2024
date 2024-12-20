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
      d="M16.752 23.994L6.87897 14.121C6.31656 13.5584 6.00061 12.7955 6.00061 12C6.00061 11.2045 6.31656 10.4415 6.87897 9.87896L16.746 0.0119629L18.16 1.42596L8.29297 11.293C8.1055 11.4805 8.00018 11.7348 8.00018 12C8.00018 12.2651 8.1055 12.5194 8.29297 12.707L18.166 22.58L16.752 23.994Z"
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
