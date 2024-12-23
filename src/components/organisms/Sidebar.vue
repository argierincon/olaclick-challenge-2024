<template>
  <aside class="sidebar">
    <div class="searchbox">
      <span>
        <Icon name="Magnify" />
      </span>
      <input type="text" placeholder="Search..." class="focus:outline-none" />
    </div>

    <SidebarItem
      v-for="item in items"
      :key="item.label"
      :path="item.path"
      :currentRoute="currentRoute"
      :isActive="
        item.label === 'Órdenes' && currentRoute.startsWith(item.path ?? '')
      "
      class="sidebar__item"
      @click="handleSidebarItemClick(item)"
    >
      <span>
        {{ item.label }}
      </span>

      <Tooltip v-if="item.label !== 'Órdenes'">
        {{ item.tooltipText }}
      </Tooltip>
    </SidebarItem>

    <section class="sidebar__mkt">
      <div>
        <div class="flex items-center gap-x-3">
          <p class="brand-name">DeliHouse</p>
          <span class="h-[5px] w-[5px] bg-[#2e71f9] rounded-full"></span>
          <p class="text-gray-400 text-sm">Pos System</p>
        </div>
        <p class="slogan">
          El sabor de ensueño y la magia de sabores deliciosos.
        </p>
      </div>

      <div class="copyright">
        <p>
          <span>©</span>
          2024, Argie's Projects
        </p>
      </div>
    </section>
  </aside>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useGlobalStore } from "../../store";

import SidebarItem from "../atoms/SidebarItem.vue";
import Tooltip from "../atoms/Tooltip.vue";
import Icon from "../atoms/Icon.vue";

const globalStore = useGlobalStore();

const items = [
  {
    label: "Iniciar demo",
    tooltipText:
      "Se crearán varias órdenes al mismo tiempo en intervalos aleatorios entre 30 segundos y un minuto.",
    action: () => onCreateOrders(),
  },
  {
    label: "Simular segundo usuario",
    tooltipText:
      "Simula un segundo usuario usuario que actualiza el estado de la orden más antigua cada 30 seg.",
    action: () => onUpdateOldestOrderStatus(),
  },
  {
    label: "Detener segundo usuario",
    tooltipText:
      "Detiene la actualización automática del estado de la orden más antigua.",
    action: () => onStopUpdateOldestOrderStatus(),
  },
  {
    label: "Crear una orden",
    tooltipText: "Genera una unica orden en el sistema.",
    action: () => onCreateSingleOrder(),
  },
  {
    label: "Órdenes",
    path: "/orders",
    tooltipText: "",
    action: null,
  },
];

const route = useRoute();
const currentRoute = ref(route.path);

const onCreateOrders = async () => {
  try {
    await globalStore.addOrdersToCollection();
  } catch (error) {
    console.error(error);
  }
};

const onUpdateOldestOrderStatus = async () => {
  try {
    await globalStore.startUpdatingOldOrders();
  } catch (error) {
    console.error(error);
  }
};

const onStopUpdateOldestOrderStatus = async () => {
  try {
    await globalStore.stopUpdatingOldOrders();
  } catch (error) {
    console.error(error);
  }
};

const onCreateSingleOrder = async () => {
  try {
    await globalStore.addSingleOrderToCollection();
  } catch (error) {
    console.error(error);
  }
};

const handleSidebarItemClick = (item: {
  label: string;
  action: Function | null;
}) => {
  if (item.action) {
    item.action();
  } else {
    console.log(`${item.label} clickeado, pero no tiene acción definida.`);
  }
};

watch(route, (newRoute) => {
  currentRoute.value = newRoute.path;
});
</script>

<style lang="postcss" scoped>
.sidebar {
  @apply h-full flex flex-col p-4 gap-4;
}

.sidebar__item {
  @apply grid grid-cols-[1fr_24px] gap-3;
}

.sidebar__mkt {
  @apply mt-auto p-4 text-sm bg-white rounded-xl;
}

.brand-name {
  @apply text-[#2e71f9] font-semibold text-xl;
}

.slogan {
  @apply mt-2 text-gray-400 text-sm;
}

.copyright {
  @apply p-2 pr-4 mt-4 w-fit border rounded-full text-gray-400;

  p {
    @apply text-sm;
  }

  span {
    @apply py-[2px] px-1 rounded-full bg-[#F7F7F7];
  }
}

.searchbox {
  @apply w-full h-14 p-4 flex items-center gap-2 rounded-lg bg-white;

  span {
    @apply flex p-3 bg-[#F7F7F7] rounded-full;
  }
}
</style>
