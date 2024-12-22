<template>
  <aside class="sidebar">
    <SidebarItem
      v-for="item in items"
      :key="item.label"
      :path="item.path"
      :currentRoute="currentRoute"
    >
      {{ item.label }}
    </SidebarItem>
    <section class="sidebar__mkt">
      <div>
        <p class="brand-name">OlaclickHouse</p>
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
import SidebarItem from "../atoms/SidebarItem.vue";

const items = [
  { label: "Iniciar demo" },
  { label: "Simular segundo usuario" },
  { label: "Órdenes", path: "/orders" },
  // { label: "Reservas" },
  // { label: "Menú" },
  // { label: "Clientes Frecuentes" },
  // { label: "Proveedores" },
  // { label: "Pagos" },
];

const route = useRoute();
const currentRoute = ref(route.path);

watch(route, (newRoute) => {
  currentRoute.value = newRoute.path;
});
</script>

<style lang="postcss" scoped>
.sidebar {
  @apply h-full flex flex-col p-4 gap-4;
}

.sidebar__mkt {
  @apply mt-auto p-4 text-sm bg-white rounded-xl;
}

.brand-name {
  @apply text-[#0B5AF7] font-semibold text-xl;
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
</style>
