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

    <div class="item-drawer__amounts">
      <span class="amounts-semibold">Costo Unit.</span>
      <p>${{ item.price.toFixed(2) }}</p>
    </div>

    <div class="item-drawer__amounts">
      <span class="amounts-semibold">Cantidad</span>
      <p>
        {{ item.quantity }}
      </p>
    </div>

    <div class="item-drawer__amounts font-semibold">
      <span class="amounts-semibold">Total</span>
      <p>${{ (item.price * item.quantity).toFixed(2) }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface IItem {
  image: string;
  name: string;
  desc: string;
  price: number;
  quantity: number;
}

interface IProps {
  item: IItem;
}

defineProps<IProps>();
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
