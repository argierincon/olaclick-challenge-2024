<template>
  <div class="item-drawer">
    <div class="item-drawer__img">
      <Skeleton width="64px" height="64px" borderRadius="10px" />
    </div>

    <div>
      <Skeleton width="140px" height="24px" />
      <Skeleton width="240px" height="14px" class="mt-1" />
      <Skeleton width="100px" height="14px" class="mt-1" />
    </div>

    <div class="item-drawer__amounts">
      <Skeleton width="60px" height="24px" />
    </div>

    <div class="item-drawer__amounts">
      <Skeleton width="60px" height="24px" />
    </div>

    <div class="item-drawer__amounts font-semibold">
      <Skeleton width="60px" height="24px" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Skeleton from "./Skeleton.vue";
</script>

<style lang="postcss" scoped>
.item-drawer {
  @apply pb-8;
  @apply flex flex-col items-start gap-3;
  @apply lg:pt-8 lg:grid lg:grid-cols-[64px_1fr_80px_80px_80px] lg:items-center;
}

.item-drawer:not(:nth-child(2)) {
  @apply pt-8;
}

.item-drawer:not(:last-child) {
  @apply border-b border-dashed;
}

.item-drawer__img {
  @apply bg-[#F7F7F7] rounded-lg;

  img {
    @apply w-16 h-16 rounded-lg object-contain bg-contain;
  }
}

.item-drawer__amounts {
  @apply grid grid-cols-[80px_1fr] w-36 self-end lg:self-auto lg:w-auto lg:block justify-self-center gap-x-4;

  p {
    @apply text-end;
  }
}

.amounts-semibold {
  @apply font-semibold lg:hidden;
}
</style>
