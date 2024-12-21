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
          <tr v-for="dataTable in cleanData" :key="dataTable.id">
            <td
              v-for="(value, name) in dataTable"
              :key="name"
              :data-label="getTranslatedLabel(name)"
            >
              <!-- :class="{ 'hidden-id': name === 'id' }" -->
              <div class="data-cell">
                <p v-if="name !== 'status'">{{ value }}</p>

                <div v-if="name === 'status'">
                  <Chip
                    v-if="dataTable.status === 'Iniciado'"
                    label="Iniciado"
                    type="info"
                    light
                  />
                  <Chip
                    v-if="dataTable.status === 'Enviado'"
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
                  @click="prueba(dataTable.id)"
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
          :selected="globalState.tableLimit"
          :options="optPagination"
          @change="selectLimit"
        />
      </div>
    </div>

    <!-- <OrderDrawer v-if="showOrderDrawer" :orderId="selectedOrderId" /> -->

    <OrderDrawer
      :visible="showOrderDrawer"
      :orderId="order.id"
      :client="order.client"
      :status="order.status"
      :items="order.items"
      :discount="order.discount"
      :taxRate="order.taxRate"
      @update:visible="showOrderDrawer = $event"
    />
  </section>
</template>

<script setup lang="ts">
import { defineProps, computed, reactive, ref, toRefs } from "vue";
import { getPaginationRange } from "../../utils/paginationDots";
import { useGlobalStore } from "../../store";

import BtnTableActions from "../atoms/BtnTableActions.vue";
import Chip from "../atoms/Chip.vue";
import Select from "../atoms/Select.vue";
import OrderDrawer from "./OrderDrawer.vue";

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
      id: number;
      order: number;
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
  id: "ID",
  time: "Hora",
  detail: "Detalle",
  client: "Cliente",
  total: "Total",
  status: "Estado",
} as const;

const cleanData = computed(
  (): {
    id: number;
    time: string;
    detail: string;
    client: string;
    total: string;
    status: string;
  }[] => {
    return tableData.value.map((e) => ({
      id: e.id,
      time: e.time,
      detail: e.detail,
      client: e.client,
      total: e.total,
      status: e.status,
    }));
  }
);

const getTranslatedLabel = (name: keyof typeof nameMapping): string => {
  return nameMapping[name] || name;
};

// Constantes
const tableHeaders = [
  "ID",
  "Hora",
  "Detalle",
  "Cliente",
  "Total",
  "Estado",
  "Acciones",
];

// Global State
const globalState = useGlobalStore();
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

const { tableLimit, tablePage, tableTotal } = globalState;
tableTotals.from = tableLimit * tablePage - tableLimit + 1;
tableTotals.to = Math.min(tableLimit * tablePage, tableTotal);
tableTotals.total = tableTotal;

const totalButtons = ref<PaginationButton[]>([]);
const totalPageCount = Math.ceil(tableTotal / tableLimit) || 0;
totalButtons.value = getPaginationRange(totalPageCount, globalState.tablePage);

// Métodos
const changePage = (page: PaginationButton): void => {
  if (typeof page === "string") return;
  globalState.setPage(page);
};

const selectLimit = (limit: number): void => {
  globalState.setLimit(limit);
};

const showOrderDrawer = ref(false);

const prueba = (id: number) => {
  console.log(id);
  showOrderDrawer.value = true;
};

type TStatus = "started" | "delivered" | "finished";

const order = {
  id: 12345,
  client: "Eloise",
  status: "started" as TStatus,
  items: [
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
  ],
  discount: 2,
  taxRate: 0.1,
};
</script>

<style lang="postcss" scoped>
.table {
  @apply w-full border-spacing-0 text-sm;

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
