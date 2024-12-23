<template>
  <Drawer :isDrawerVisible="isDrawerVisible" @close="closeDrawer">
    <section class="order-drawer-section">
      <header class="order-drawer__header">
        <div class="header-info">
          <h4 class="flex-skeleton">
            Cliente:
            <Skeleton v-if="isLoading" width="140px" height="28px" />
            {{ globalStore.orderDetail?.client }}
          </h4>
          <p class="flex-skeleton">
            ID de la Orden:
            <Skeleton v-if="isLoading" width="40px" height="16px" />
            {{ globalStore.orderDetail?.id }}
          </p>
        </div>

        <Skeleton v-if="isLoading" width="80px" height="36px" />
        <Chip v-else :label="statusLabel" :type="statusType" :light="isLight" />
      </header>

      <section class="order-drawer__items">
        <div class="items-header">
          <p class="pl-4 rounded-full">Item</p>
          <p class="items-amounts">Costo Unit.</p>
          <p class="items-amounts">Cantidad</p>
          <p class="items-amounts">Total</p>
        </div>

        <ItemDrawerSkeleton v-if="isLoading" />
        <ItemDrawerSkeleton v-if="isLoading" />
        <ItemDrawer
          v-for="(item, index) in globalStore.orderDetail?.items"
          :key="index"
          :item="item"
        />
      </section>

      <footer class="order-drawer__footer">
        <div class="footer-waves">
          <div class="total-grid mb-2">
            <span class="text-sm">Subtotal</span>
            <span>$</span>
            <div>
              <Skeleton v-if="isLoading" width="60px" height="26px" />
              <span v-else>
                {{ subtotal?.toFixed(2) }}
              </span>
            </div>
          </div>

          <div class="total-grid mb-2 text-gray-500">
            <span class="text-sm">Tax (10%)</span>
            <span>$</span>
            <div>
              <Skeleton v-if="isLoading" width="60px" height="26px" />
              <span v-else>{{ tax.toFixed(2) }}</span>
            </div>
          </div>
          <div class="rounded-dashes-total"></div>

          <div class="total-grid mt-4 font-bold text-lg">
            <span>TOTAL</span>
            <span>$</span>
            <div>
              <Skeleton v-if="isLoading" width="60px" height="26px" />
              <span v-else>{{ total.toFixed(2) }}</span>
            </div>
          </div>

          <button
            v-if="globalStore.orderDetail?.status !== 'finished'"
            class="order-drawer__btn"
            @click="markAsDelivered"
            :class="buttonClass"
          >
            <Icon class="text-white" v-if="isLoadingStatus" name="Spinner" />
            <span v-else>
              {{ buttonLabel }}
            </span>
          </button>
        </div>
      </footer>
    </section>
  </Drawer>
</template>

<script setup lang="ts">
import { ref, computed, defineProps, onMounted } from "vue";
import type { TStatus } from "../../interfaces/Orders";
import { useGlobalStore } from "../../store";

import Chip from "../atoms/Chip.vue";
import ItemDrawer from "../atoms/ItemDrawer.vue";
import Icon from "../atoms/Icon.vue";
import Skeleton from "../atoms/Skeleton.vue";
import ItemDrawerSkeleton from "../atoms/ItemDrawerSkeleton.vue";
import Drawer from "../atoms/Drawer.vue";

const globalStore = useGlobalStore();

interface IProps {
  isDrawerVisible: boolean;
  uid?: string;
}

defineProps<IProps>();

const isLoading = ref(false);

const onGetCurrentOrder = async () => {
  const orderUid = localStorage.getItem("currentOrderId");

  if (orderUid) {
    try {
      isLoading.value = true;
      await globalStore.getOrderDetail(orderUid);
    } catch (error) {
      console.error("Error loading order details:", error);
    } finally {
      isLoading.value = false;
    }
  } else {
    console.warn("No current order ID found in localStorage.");
  }
};

const statusLabel = computed(() => {
  const statusMap: Record<TStatus, string> = {
    started: "Iniciado",
    delivered: "Enviado",
    finished: "Entregado",
  };

  const status = globalStore.orderDetail?.status;

  return (status && statusMap[status]) || "";
});

const statusType = computed(() => {
  switch (globalStore.orderDetail?.status) {
    case "started":
      return "info";
    case "delivered":
      return "success";
    case "finished":
      return "success";
    default:
      return "info";
  }
});

const isLight = computed(() => {
  return (
    globalStore.orderDetail?.status === "started" ||
    globalStore.orderDetail?.status === "delivered"
  );
});

const subtotal = computed(() =>
  globalStore.orderDetail?.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )
);

const tax = computed(
  () => subtotal.value * (globalStore.orderDetail?.taxRate ?? 0.1)
);

const total = computed(
  () => subtotal.value + tax.value - (globalStore.orderDetail?.discount ?? 0)
);

const isLoadingStatus = ref(false);

const markAsDelivered = async () => {
  try {
    isLoadingStatus.value = true;

    let newStatus: TStatus;

    if (globalStore.orderDetail?.status === "started") {
      newStatus = "delivered";
    } else if (globalStore.orderDetail?.status === "delivered") {
      newStatus = "finished";
    } else {
      throw new Error("El estado actual no permite una transición.");
    }

    if (!globalStore.orderDetail?.uid) {
      console.error("UID is undefined or null");
      return;
    }

    await globalStore.updateOrderStatus(
      globalStore.orderDetail?.uid,
      newStatus
    );

    console.log(
      `La orden ${globalStore.orderDetail?.id} ha sido actualizada a ${newStatus}`
    );
  } catch (error) {
    console.error("Error al actualizar el estado de la orden:", error);
  } finally {
    isLoadingStatus.value = false;
    await globalStore.getOrderDetail(globalStore.orderDetail?.uid ?? "");
  }
};

const buttonLabel = computed(() => {
  if (globalStore.orderDetail?.status === "started") {
    return "Enviar Orden";
  } else if (globalStore.orderDetail?.status === "delivered") {
    return "Entregar Orden";
  }
  return "";
});

const buttonClass = computed(() => {
  if (globalStore.orderDetail?.status === "started") {
    return "btn-started";
  } else if (globalStore.orderDetail?.status === "delivered") {
    return "btn-delivered";
  }
  return "";
});

const emit = defineEmits(["close"]);

const closeDrawer = () => {
  emit("close");
};

onMounted(() => {
  if (globalStore.orderDetail === null) {
    onGetCurrentOrder();
  }
});
</script>

<style lang="postcss" scoped>
.order-drawer-section {
  @apply h-full grid grid-rows-[100px_1fr_auto];
}

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
  @apply h-full pt-8 pb-6 px-6 bg-[#f6f6f6];
  --mask: radial-gradient(12.81px at 50% 18px, #000 99%, #0000 101%)
      calc(50% - 20px) 0/40px 100%,
    radial-gradient(12.81px at 50% -8px, #0000 99%, #000 101%) 50% 10px/40px
      100% repeat-x;
  -webkit-mask: var(--mask);
  mask: var(--mask);
}

.total-grid {
  @apply grid grid-cols-[1fr_20px_100px];

  div {
    @apply flex justify-center ml-auto;
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

.order-drawer__btn {
  @apply py-2 w-full h-14 mt-8 font-semibold text-white rounded-lg  transition;
}

.btn-started {
  @apply bg-[#2D71F8] hover:bg-blue-700;
}

.btn-delivered {
  @apply bg-green-500 hover:bg-green-700;
}

.flex-skeleton {
  @apply flex gap-2;
}
</style>
