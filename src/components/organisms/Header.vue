<template>
  <header class="header">
    <Icon
      name="MenuBurger"
      size="24px"
      class="text-blue-500 hover:text-blue-300"
    />

    <h3>Órdenes</h3>
  </header>
</template>

<script setup lang="ts">
import Icon from "../atoms/Icon.vue";
</script>

<style lang="postcss" scoped>
.header {
  @apply flex;
}
</style>
