<template>
  <aside class="h-full flex flex-col p-4 gap-4">
    <SidebarItem
      v-for="item in items"
      :key="item.label"
      :path="item.path"
      :currentRoute="currentRoute"
    >
      {{ item.label }}
    </SidebarItem>
    <section class="mt-auto p-4 text-sm bg-white rounded-xl">
      <div>
        <p class="text-[#0B5AF7] font-medium text-xl">OlaclickHouse</p>
        <p class="mt-2 text-gray-400 text-sm">
          El sabor de ensueño y la magia de sabores deliciosos.
        </p>
      </div>

      <div>
        <div class="p-2 pr-4 mt-4 w-fit border rounded-full text-gray-400">
          <p class="text-xs">
            <span class="py-[2px] px-1 rounded-full bg-[#F7F7F7]">©</span>
            2024, Argie's Projects
          </p>
        </div>
      </div>
    </section>
  </aside>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import SidebarItem from "../atoms/SidebarItem.vue";

const items = [
  { label: "Órdenes", path: "/" },
  { label: "Reservas" },
  { label: "Menú" },
  { label: "Clientes Frecuentes" },
  { label: "Proveedores" },
  { label: "Pagos" },
];

const route = useRoute();
const currentRoute = ref(route.path);

watch(route, (newRoute) => {
  currentRoute.value = newRoute.path;
});
</script>

<style scoped>
aside {
  display: flex;
  flex-direction: column;
}
</style>
