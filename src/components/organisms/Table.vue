<template>
  <section class="responsive-table">
    <div class="table-wrapper">
      <table class="table">
        <thead>
          <tr>
            <th
              v-for="(item, idx) in tableHeaders"
              :key="item"
              :class="{
                'rounded-l-xl': idx === 0,
                'rounded-r-xl': idx === tableHeaders.length - 1,
              }"
            >
              <span> {{ item }} </span>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-if="cleanData.length === 0">
            <td colspan="100%" class="text-center">
              <div class="td-empty">No hay registros</div>
            </td>
          </tr>

          <tr v-for="dataTable in cleanData" :key="dataTable.id">
            <td
              v-for="(value, name) in dataTable"
              :key="name"
              :data-label="getTranslatedLabel(name)"
              :class="{ 'hidden-id': name === 'uid' }"
            >
              <div class="data-cell">
                <p v-if="name !== 'status'">
                  <span v-if="name === 'total'">$</span>
                  {{ value }}
                </p>

                <div v-if="name === 'status'">
                  <Chip
                    v-if="dataTable.status === 'started'"
                    label="Iniciado"
                    type="info"
                    light
                  />
                  <Chip
                    v-if="dataTable.status === 'delivered'"
                    label="Enviado"
                    type="success"
                    light
                  />
                </div>
              </div>
            </td>
            <td data-label="Acciones">
              <div class="flex gap-[10px]">
                <slot />
                <BtnTableActions
                  typeBtn="success"
                  :icon="loadingUid === dataTable.uid ? 'Spinner' : 'Eye'"
                  @click="navigateToOrder(dataTable.uid, dataTable.id)"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="responsive-table__pagination">
      <div class="pagination-buttons">
        <!-- :class="tableTotal === 0 ? 'opacity-0' : ''" -->
        <BtnTableActions
          icon="ChevronLeft"
          :disabled="tablePage === 1"
          :onClick="() => changePage(tablePage - 1)"
        />
        <nav class="page-navigation">
          <ul class="button-numbers">
            <li>
              <button
                v-for="btn in totalButtons"
                class="btn-page"
                :class="{ 'btn-page--active': tablePage === btn }"
                :key="btn"
                :disabled="typeof btn === 'string'"
                @click="changePage(btn)"
              >
                {{ btn }}
              </button>
            </li>
          </ul>
        </nav>
        <BtnTableActions
          icon="ChevronRight"
          :disabled="tablePage === totalButtons.length"
          :onClick="() => changePage(tablePage + 1)"
        />
      </div>
      <div class="responsive-table__totals">
        <p class="text-gray-600 text-sm">
          Mostrando {{ tableTotals.from }} a {{ tableTotals.to }} de
          {{ tableTotals.total }} registros
        </p>
        <Select
          iconChevronUp
          size="small"
          placeholder="Mostrar 10"
          :selected="globalStore.tableLimit"
          :options="optPagination"
          @change="selectLimit"
        />
      </div>
    </div>

    <OrderDrawer :isDrawerVisible="showOrderDrawer" @close="closeDrawer" />
  </section>
</template>

<script setup lang="ts">
import { defineProps, computed, ref, toRefs, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getPaginationRange } from "../../utils/paginationDots";
import { useGlobalStore } from "../../store";
import { storeToRefs } from "pinia";
import type { IOrder } from "../../store/interfaces/IOrders";

import BtnTableActions from "../atoms/BtnTableActions.vue";
import Chip from "../atoms/Chip.vue";
import Select from "../atoms/Select.vue";
import OrderDrawer from "./OrderDrawer.vue";

const route = useRoute();
const router = useRouter();

const globalStore = useGlobalStore();

interface ITotals {
  from: number;
  to: number;
  total: number;
}

type PaginationButton = number | string;

const props = defineProps({
  tableData: {
    type: Array as () => {
      uid: string;
      id: number;
      time: string;
      detail: string;
      client: string;
      total: string;
      status: string;
    }[],
    required: true,
  },
});

const { tableData } = toRefs(props);

const nameMapping = {
  uid: "uid",
  id: "ID",
  time: "Hora",
  detail: "Detalle",
  client: "Cliente",
  total: "Total",
  status: "Estado",
} as const;

const cleanData = computed(() => {
  const data = Array.isArray(tableData.value) ? tableData.value : [];

  return data.map((e) => ({
    uid: e.uid,
    id: e.id,
    time: e.time,
    detail: e.detail,
    client: e.client,
    total: e.total,
    status: e.status,
  }));
});

const getTranslatedLabel = (name: keyof typeof nameMapping): string => {
  return nameMapping[name] || name;
};

const tableHeaders = [
  "Nº",
  "Hora",
  "Detalle",
  "Cliente",
  "Total",
  "Estado",
  "Acciones",
];

const optPagination = [
  { label: "Mostrar 10", value: 10 },
  { label: "Mostrar 20", value: 20 },
  { label: "Mostrar 30", value: 30 },
  { label: "Mostrar 40", value: 40 },
  { label: "Mostrar 50", value: 50 },
];

const { tableLimit, tablePage, tableTotal } = storeToRefs(globalStore);
const tableTotals = computed(() => {
  const totals: ITotals = { from: 0, to: 0, total: 0 };
  totals.from = tableLimit.value * tablePage.value - tableLimit.value + 1;
  totals.to = Math.min(tableLimit.value * tablePage.value, tableTotal.value);
  totals.total = tableTotal.value;

  return totals;
});

const totalButtons = computed(() => {
  const totalPageCount = Math.ceil(tableTotal.value / tableLimit.value) || 0;
  return getPaginationRange(totalPageCount, globalStore.tablePage);
});

// Métodos
const changePage = (page: PaginationButton): void => {
  if (typeof page === "string") return;
  globalStore.setPage(page);
};

const selectLimit = (limit: number): void => {
  globalStore.setLimit(limit);
};

const selectedOrderId = ref<number | null>(null);
const currentOrder = ref<IOrder | null>(null);

const isLoading = ref(false);
const loadingUid = ref<string | null>(null);

const showOrderDrawer = ref(false);

const navigateToOrder = async (orderUid: string, orderId: number) => {
  try {
    loadingUid.value = orderUid;
    await globalStore.getOrderDetail(orderUid);

    showOrderDrawer.value = true;

    localStorage.setItem("currentOrderId", orderUid);
    selectedOrderId.value = orderId;

    currentOrder.value = globalStore.orderDetail;

    router.push({ name: "OrderDetail", params: { id: Number(orderId) } });
  } catch (error) {
    console.error("Error al obtener el detalle de la orden:", error);
  } finally {
    isLoading.value = false;
    loadingUid.value = null;
  }
};

const closeDrawer = () => {
  showOrderDrawer.value = false;
  router.push("/");
};

onMounted(() => {
  if (route.params.id) {
    selectedOrderId.value = Number(route.params.id);
  }
});
</script>

<style lang="postcss" scoped>
.table {
  @apply w-full border-spacing-0;

  & thead {
    @apply bg-gray-100 rounded-[10px] text-gray-600;
  }

  & th {
    @apply py-[18.5px] px-4;
  }

  & th,
  & td {
    @apply text-gray-900;
  }

  & td {
    @apply py-2 px-3 [&:not(:last-child)]:border-b border-b-gray-200;
    @apply lg:py-[22px] lg:px-4 lg:border-b;
  }

  & tr {
    @apply rounded-xl;
    @apply lg:rounded-none;
  }
}

th:not([align]),
td:not([align]) {
  text-align: inherit;
}

.td-empty {
  @apply flex justify-center text-base;
}

.table-wrapper {
  @apply overflow-x-auto;
  max-height: calc(100vh - 100px);
}

.table-wrapper td.hidden-id {
  @apply !hidden;
}

.table-wrapper {
  @apply overflow-x-auto;
}

.mini-label {
  @apply text-gray-500 text-xs;
}

.responsive-table__pagination {
  @apply py-6 flex flex-col gap-y-6 lg:flex-row items-center justify-between;
  @apply lg:sticky lg:bottom-0 lg:bg-white;
}

.page-navigation {
  @apply max-w-[100px] overflow-x-auto whitespace-nowrap;
  @apply md:max-w-none;

  &::-webkit-scrollbar {
    @apply hidden;
  }
}

.pagination-buttons {
  @apply flex items-center gap-6;
}

.button-numbers {
  @apply flex items-center text-xs;
}

.btn-page {
  @apply h-8 w-8 rounded-[10px] text-sm;
}

.btn-page--active {
  @apply bg-gray-100;
}

.responsive-table__totals {
  @apply flex flex-col gap-4 lg:flex-row lg:items-center;
}

@media screen and (max-width: 768px) {
  thead {
    @apply hidden;
  }

  .table-wrapper thead tr th {
    @apply hidden;
  }

  .table-wrapper tr {
    @apply max-w-full relative block border;
    @apply [&:not(:last-child)]:mb-4 [&:not([class*="is-"])]:bg-white;
  }

  .table-wrapper tr td {
    @apply w-auto flex gap-4 items-center justify-between;

    .data-cell {
      @apply flex flex-col items-end text-end;
    }

    &:before {
      @apply font-bold text-left capitalize;
      content: attr(data-label);
    }
  }
}
</style>
