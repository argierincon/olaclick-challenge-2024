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
                  icon="Eye"
                  @click="navigateToOrder(dataTable.uid)"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="responsive-table__pagination">
      <div class="pagination-buttons">
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

    <OrderDrawer
      :visible="showOrderDrawer"
      :orderId="currentOrder?.id"
      :client="currentOrder?.client"
      :status="currentOrder?.status"
      :items="currentOrder?.items"
      :discount="currentOrder?.discount"
      :taxRate="currentOrder?.taxRate"
      @update:visible="showOrderDrawer = $event"
    />
  </section>
</template>

<script setup lang="ts">
import {
  defineProps,
  computed,
  reactive,
  ref,
  toRefs,
  onMounted,
  watch,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import { getPaginationRange } from "../../utils/paginationDots";
import { useGlobalStore } from "../../store";
import type { IOrder } from "../../store/interfaces/IOrders";

import BtnTableActions from "../atoms/BtnTableActions.vue";
import Chip from "../atoms/Chip.vue";
import Select from "../atoms/Select.vue";
import OrderDrawer from "./OrderDrawer.vue";

const route = useRoute();
const router = useRouter();

const globalStore = useGlobalStore();

// Tipos
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

const tableTotals = reactive<ITotals>({
  from: 0,
  to: 0,
  total: 0,
});

const { tableLimit, tablePage, tableTotal } = globalStore;
tableTotals.from = tableLimit * tablePage - tableLimit + 1;
tableTotals.to = Math.min(tableLimit * tablePage, tableTotal);
tableTotals.total = tableTotal;

const totalButtons = ref<PaginationButton[]>([]);
const totalPageCount = Math.ceil(tableTotal / tableLimit) || 0;
totalButtons.value = getPaginationRange(totalPageCount, globalStore.tablePage);

// Métodos
const changePage = (page: PaginationButton): void => {
  if (typeof page === "string") return;
  globalStore.setPage(page);
};

const selectLimit = (limit: number): void => {
  console.log("limit", limit);

  globalStore.setLimit(limit);
};

const selectedOrderId = ref<string | null>(null);
const showOrderDrawer = ref(false);

const currentOrder = ref<IOrder | null>(null);

const navigateToOrder = async (orderUid: string) => {
  console.log(`Order ID seleccionado: ${orderUid}`);

  try {
    await globalStore.getOrderDetail(orderUid);

    currentOrder.value = globalStore.orderDetail;

    selectedOrderId.value = orderUid;
    showOrderDrawer.value = true;

    // router.push({ name: "OrderDetail", params: { id: String(orderId) } });
  } catch (error) {
    console.error("Error al obtener el detalle de la orden:", error);
  }
};

onMounted(() => {
  if (route.params.id) {
    // selectedOrderId.value = route.params.id;
    showOrderDrawer.value = true;
  }
});

// watch(
//   () => route.params.id,
//   (newId) => {
//     if (newId) {
//       selectedOrderId.value = newId;
//       showOrderDrawer.value = true;
//     } else {
//       selectedOrderId.value = null;
//       showOrderDrawer.value = false;
//     }
//   }
// );

// const order = {
//   uid: "1",
//   id: 1,
//   client: "Eloise",
//   status: "started" as TStatus,
//   items: [
//     {
//       name: "Beef Crowich",
//       desc: "Emit event to notify parent to close the sidebar",
//       price: 5.5,
//       quantity: 1,
//       image:
//         "https://epicwatersgp.com/content/uploads/2020/03/croissant-beef.png",
//     },
//     {
//       name: "Sliced Black Forest",
//       desc: "Emit event to notify parent to close the sidebar",
//       price: 5.0,
//       quantity: 2,
//       image:
//         "https://www.sugarplumbakery.org/wp-content/uploads/2022/05/A92A6026-2-1200x800.png",
//     },
//     {
//       name: "Solo Floss Bread",
//       desc: "Emit event to notify parent to close the sidebar",
//       price: 4.5,
//       quantity: 1,
//       image:
//         "https://crustabakes.wordpress.com/wp-content/uploads/2010/10/floss-bread-11.jpg",
//     },
//   ],
//   discount: 2,
//   taxRate: 0.1,
// };
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
  @apply mt-6 flex flex-col gap-y-6 lg:flex-row items-center justify-between;
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
