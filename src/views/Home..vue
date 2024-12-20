<template>
  <section class="p-3 bg-white rounded-xl">
    <Table :tableData="transactions" />

    <!-- <div>
      <p class="font-thin">Texto Thin</p>
      <p class="font-light">Texto Light</p>
      <p class="font-normal">Texto Normal</p>
      <p class="font-medium">Texto Medium</p>
      <p class="font-semibold">Texto SemiBold</p>
      <p class="font-bold">Texto Bold</p>
      <p class="font-extrabold">Texto ExtraBold</p>
      <p class="font-black">Texto Black</p>
    </div> -->
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Table from "../components/organisms/Table.vue";

const transactions = ref([
  {
    id: 1,
    order: 1,
    time: "2024-12-01 12:00",
    detail: "Compra de productos",
    client: "Cliente A",
    total: "$500",
    status: "Entregado",
  },
  {
    id: 2,
    order: 2,
    time: "2024-12-02 14:00",
    detail: "Servicio técnico",
    client: "Cliente B",
    total: "$200",
    status: "Iniciado",
  },
  {
    id: 3,
    order: 3,
    time: "2024-12-03 09:30",
    detail: "Suscripción mensual",
    client: "Cliente C",
    total: "$50",
    status: "Entregado",
  },
  {
    id: 4,
    order: 4,
    time: "2024-12-04 16:15",
    detail: "Compra de productos",
    client: "Cliente D",
    total: "$100",
    status: "Iniciado",
  },
  {
    id: 5,
    order: 5,
    time: "2024-12-04 16:15",
    detail: "Compra de productos",
    client: "Cliente D",
    total: "$100",
    status: "Enviado",
  },
]);
</script>
