<template>
  <transition name="fade">
    <section>
      <!-- Overlay -->
      <div
        v-if="visible"
        class="overlay fixed inset-0 bg-[#c4ced89c] opacity-50 z-10"
        @click="close"
      ></div>

      <!-- Sidebar -->
      <transition name="slide-in">
        <div
          v-if="visible"
          class="order-details fixed right-0 top-0 h-full w-full md:w-[50%] bg-white shadow-lg flex flex-col z-20"
        >
          <!-- Header -->
          <header class="drawer-header">
            <div>
              <h2 class="text-xl font-semibold">Eloise's Order</h2>
              <p class="text-sm text-gray-500">ID de la Orden: 5</p>
            </div>

            <Chip label="Entregado" type="success" light />
          </header>

          <!-- Order Details -->
          <section class="px-6 flex-grow overflow-y-auto">
            <!-- Header for the items -->
            <div
              class="py-3 grid grid-cols-[1fr_80px_80px_80px] items-center gap-x-3 font-semibold bg-[#F7F7F7] rounded-xl"
            >
              <p class="pl-4 rounded-full">Item</p>
              <p class="rounded-full justify-self-center text-center">
                Costo Unit.
              </p>
              <p class="rounded-full justify-self-center text-center">
                Cantidad
              </p>
              <p class="rounded-full justify-self-center text-center">Total</p>
            </div>

            <!-- Order Items -->
            <div
              v-for="(item, index) in items"
              :key="index"
              class="grid grid-cols-[64px_1fr_80px_80px_80px] gap-x-3 items-center py-8 border-b border-dashed"
            >
              <div class="bg-[#F7F7F7] rounded-lg">
                <img
                  :src="item.image"
                  alt=""
                  class="w-16 h-16 rounded-lg object-contain bg-contain"
                />
              </div>

              <div>
                <p class="font-medium">{{ item.name }}</p>
                <p class="text-sm text-gray-500">
                  {{ item.desc }}
                </p>
              </div>

              <div class="justify-self-center">
                ${{ item.price.toFixed(2) }}
              </div>

              <div class="justify-self-center">{{ item.quantity }}</div>

              <div class="font-semibold justify-self-center">
                ${{ (item.price * item.quantity).toFixed(2) }}
              </div>
            </div>

            <div class="rounded-dashes"></div>
          </section>

          <!-- Order Summary -->

          <footer class="custom-shadow">
            <div class="pt-8 px-6 pb-6 box">
              <footer>
                <div class="flex justify-between mb-2">
                  <span class="text-sm">Subtotal</span>
                  <span>${{ subtotal.toFixed(2) }}</span>
                </div>
                <div class="flex justify-between mb-2 text-gray-500">
                  <span class="text-sm">Tax (10%)</span>
                  <span cl>${{ tax.toFixed(2) }}</span>
                </div>
                <div class="rounded-dashes-total"></div>

                <!-- <div class="flex justify-between mb-2 text-green-500">
                <span class="text-sm">Discount</span>
                <span>-${{ discount.toFixed(2) }}</span>
              </div> -->
                <div class="pt-4 flex justify-between font-bold text-lg">
                  <span>TOTAL</span>
                  <span>${{ total.toFixed(2) }}</span>
                </div>
                <button
                  class="w-full h-14 mt-8 bg-[#2D71F8] text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Place Order
                </button>
              </footer>
            </div>
          </footer>
        </div>
      </transition>
    </section>
  </transition>
</template>

<script setup lang="ts">
import { ref, computed, defineProps, defineEmits } from "vue";
import Chip from "../atoms/Chip.vue";

defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["update:visible"]);

interface OrderItem {
  name: string;
  price: number;
  desc: string;
  quantity: number;
  image: string;
}

const items = ref<OrderItem[]>([
  {
    name: "Beef Crowich",
    desc: "Emit event to notify parent to close the sidebar",
    price: 5.5,
    quantity: 1,
    image:
      "https://epicwatersgp.com/content/uploads/2020/03/croissant-beef.png",
  },
  {
    name: "Sliced Black Forest",
    desc: "Emit event to notify parent to close the sidebar",
    price: 5.0,
    quantity: 2,
    image:
      "https://www.sugarplumbakery.org/wp-content/uploads/2022/05/A92A6026-2-1200x800.png",
  },
  {
    name: "Solo Floss Bread",
    desc: "Emit event to notify parent to close the sidebar",
    price: 4.5,
    quantity: 1,
    image:
      "https://crustabakes.wordpress.com/wp-content/uploads/2010/10/floss-bread-11.jpg",
  },
]);

const discount = ref(1.0);
const taxRate = 0.1;

const subtotal = computed(() =>
  items.value.reduce((acc, item) => acc + item.price * item.quantity, 0)
);

const tax = computed(() => subtotal.value * taxRate);

const total = computed(() => subtotal.value + tax.value - discount.value);

const close = () => {
  emit("update:visible", false);
};
</script>

<style lang="postcss" scoped>
.order-details {
  @apply gap-y-8;
  transition: transform 0.3s ease-in-out;
}

.drawer-header {
  @apply p-6 flex justify-between items-center bg-white border-solid;
  box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.1);
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-in-enter-active,
.slide-in-leave-active {
  transition: transform 0.3s ease-in-out;
}

.slide-in-enter-from {
  transform: translateX(100%);
}

.slide-in-leave-to {
  transform: translateX(100%);
}

.box {
  @apply bg-[#f6f6f6];
  /* @apply bg-white; */
  --mask: radial-gradient(12.81px at 50% 18px, #000 99%, #0000 101%)
      calc(50% - 20px) 0/40px 100%,
    radial-gradient(12.81px at 50% -8px, #0000 99%, #000 101%) 50% 10px/40px
      100% repeat-x;
  -webkit-mask: var(--mask);
  mask: var(--mask);
}

.custom-shadow {
  @apply relative;

  &::before {
    content: "";
    position: absolute;
    top: -10px;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #00000025;
    filter: blur(20px) opacity(0.5);
  }
}

.rounded-dashes-total {
  --s: 1px;
  --c: #dfdfdf;
  --_g: var(--s) top 50%, var(--c) calc(100% - 1px), #0000;

  height: var(--s);
  width: 100%;

  background: 0 / calc(20 * var(--s)) space no-repeat;
  background-image: radial-gradient(circle closest-side at left var(--_g)),
    radial-gradient(circle closest-side at right var(--_g)),
    linear-gradient(90deg, #0000 25%, var(--c) 0 75%, #0000 0);
}
</style>
