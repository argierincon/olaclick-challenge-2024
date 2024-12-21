<template>
  <transition name="fade">
    <section>
      <!-- Overlay -->
      <div
        v-if="visible"
        class="overlay fixed inset-0 bg-[#c4ced89c] opacity-50 z-10"
        @click="close"
      ></div>

      <!-- Drawer -->
      <transition name="slide-in">
        <div v-if="visible" class="order-drawer">
          <header class="order-drawer__header">
            <div class="header-info">
              <h4>Eloise's Order</h4>
              <p>ID de la Orden: 5</p>
            </div>

            <Chip label="Entregado" type="success" light />
          </header>

          <section class="order-drawer__items">
            <div class="items-header">
              <p class="pl-4 rounded-full">Item</p>
              <p class="items-amounts">Costo Unit.</p>
              <p class="items-amounts">Cantidad</p>
              <p class="items-amounts">Total</p>
            </div>

            <ItemDrawer
              v-for="(item, index) in items"
              :key="index"
              :item="item"
            />
          </section>

          <footer class="order-drawer__footer">
            <div class="footer-waves">
              <div class="total-grid mb-2">
                <span class="text-sm">Subtotal</span>
                <span>$</span>
                <span class="text-end">
                  {{ subtotal.toFixed(2) }}
                </span>
              </div>

              <div class="total-grid mb-2 text-gray-500">
                <span class="text-sm">Tax (10%)</span>
                <span>$</span>
                <span class="text-end">{{ tax.toFixed(2) }}</span>
              </div>
              <div class="rounded-dashes-total"></div>

              <div class="total-grid mt-4 font-bold text-lg">
                <span>TOTAL</span>
                <span>$</span>
                <span class="text-end">{{ total.toFixed(2) }}</span>
              </div>

              <button class="order-drawer__btn">
                <!-- ENVIAR O ENTREGAR -->
                Entregar Orden
              </button>
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
import ItemDrawer from "../atoms/ItemDrawer.vue";

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
.order-drawer {
  @apply h-full w-full flex flex-col gap-y-6 fixed right-0 top-0 z-10 bg-white shadow-lg;
  @apply md:w-[50%];
  transition: transform 0.3s ease-in-out;
}

.order-drawer__header {
  @apply p-6 flex justify-between items-center bg-white border-solid;
}

.header-info {
  p {
    @apply text-sm text-gray-500;
  }
}

.order-drawer__items {
  @apply px-6 flex-grow overflow-y-auto;
}

.items-header {
  @apply hidden py-3;
  @apply lg:grid lg:grid-cols-[1fr_80px_80px_80px] lg:items-center lg:gap-x-3 lg:font-semibold lg:bg-[#F7F7F7] lg:rounded-xl;
}

.items-amounts {
  @apply rounded-full justify-self-center text-center;
}

.order-drawer__footer {
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

.footer-waves {
  @apply pt-8 pb-6 px-6 bg-[#f6f6f6];
  --mask: radial-gradient(12.81px at 50% 18px, #000 99%, #0000 101%)
      calc(50% - 20px) 0/40px 100%,
    radial-gradient(12.81px at 50% -8px, #0000 99%, #000 101%) 50% 10px/40px
      100% repeat-x;
  -webkit-mask: var(--mask);
  mask: var(--mask);
}

.total-grid {
  @apply grid grid-cols-[1fr_20px_100px];
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

.order-drawer__btn {
  @apply py-2 w-full h-14 mt-8 bg-[#2D71F8] text-white  rounded-lg hover:bg-blue-700 transition;
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
</style>
