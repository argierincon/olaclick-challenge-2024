<template>
  <div class="item-drawer">
    <div class="item-drawer__img">
      <img :src="item.image" :alt="item.desc" />
    </div>

    <div>
      <p class="font-medium">{{ item.name }}</p>
      <p class="text-sm text-gray-500">
        {{ item.desc }}
      </p>
    </div>

    <div class="justify-self-center">${{ item.price.toFixed(2) }}</div>

    <div class="justify-self-center">{{ item.quantity }}</div>

    <div class="font-semibold justify-self-center">
      ${{ (item.price * item.quantity).toFixed(2) }}
    </div>
  </div>
</template>

<script setup lang="ts">
interface IProps {
  image: string;
  name: string;
  desc: string;
  price: number;
  quantity: number;
}

defineProps<{ item: IProps }>();
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
</style>
