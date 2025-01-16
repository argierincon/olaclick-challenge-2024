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
                  {{ value }}
                </p>

                <div v-if="name === 'status'">
                  <Chip
                    v-if="dataTable.status === 'started'"
                    label="Iniciada"
                    type="info"
                    light
                  />
                  <Chip
                    v-if="dataTable.status === 'delivered'"
                    label="Enviada"
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
          :disabled="currentPage === 1"
          :onClick="() => onChangePage(currentPage - 1)"
        />
        <nav class="page-navigation">
          <ul class="button-numbers">
            <Skeleton
              v-if="arrRangeButtons.length === 0"
              width="32px"
              height="32px"
              borderRadius="10px"
            />
            <li v-else>
              <button
                v-for="btn in arrRangeButtons"
                class="btn-page"
                :class="{ 'btn-page--active': currentPage === btn }"
                :key="btn"
                :disabled="typeof btn === 'string'"
                @click="onChangePage(btn)"
              >
                {{ btn }}
              </button>
            </li>
          </ul>
        </nav>
        <BtnTableActions
          icon="ChevronRight"
          :disabled="currentPage === totalPageCount"
          :onClick="() => onChangePage(currentPage + 1)"
        />
      </div>
      <div class="responsive-table__totals">
        <div class="flex items-center gap-x-1 text-gray-600 text-sm">
          Mostrando
          <Skeleton
            v-if="tableTotals.to == 0"
            width="24px"
            height="24px"
            borderRadius="8px"
          />
          <span v-else>
            {{ tableTotals.from }}
          </span>
          a
          <Skeleton
            v-if="tableTotals.to == 0"
            width="24px"
            height="24px"
            borderRadius="8px"
          />
          <span>
            {{ tableTotals.to }}
          </span>
          de
          <Skeleton
            v-if="tableTotals.total == 0"
            width="24px"
            height="24px"
            borderRadius="8px"
          />
          <span>
            {{ tableTotals.total }}
          </span>
          registros
        </div>
        <Select
          iconChevronUp
          size="small"
          placeholder="Mostrar 10"
          :selected="limitPerPage"
          :options="optPagination"
          @change="onChangeLimit"
        />
      </div>
    </div>

    <OrderDrawer :isDrawerVisible="showOrderDrawer" @close="closeDrawer" />
  </section>
</template>

<script setup lang="ts">
import { defineProps, computed, ref, toRefs, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getPaginationRange } from "../../utils/paginationDots";
import { useGlobalStore } from "../../store";

import BtnTableActions from "../atoms/BtnTableActions.vue";
import Chip from "../atoms/Chip.vue";
import Select from "../atoms/Select.vue";
import OrderDrawer from "./OrderDrawer.vue";
import Skeleton from "../atoms/Skeleton.vue";
import type { IOrdersTable } from "../../store/interfaces/IOrders";

const route = useRoute();
const router = useRouter();
const globalStore = useGlobalStore();

interface IProps {
  tableData: IOrdersTable[];
  limitPerPage: number;
  currentPage: number;
  tableTotal: number;
  tableHeaders: string[];
}

const props = defineProps<IProps>();

const { tableData, limitPerPage, currentPage, tableTotal } = toRefs(props);

interface ITotals {
  from: number;
  to: number;
  total: number;
}

const tableTotals = computed(() => {
  const totals: ITotals = { from: 0, to: 0, total: 0 };
  totals.from = limitPerPage.value * currentPage.value - limitPerPage.value + 1;
  totals.to = Math.min(
    limitPerPage.value * currentPage.value,
    tableTotal.value
  );
  totals.total = tableTotal.value;

  return totals;
});

const totalPageCount = ref<number>(0);

const arrRangeButtons = computed(() => {
  totalPageCount.value = Math.ceil(tableTotal.value / limitPerPage.value) || 0;
  return getPaginationRange(totalPageCount.value, currentPage.value);
});

// EVENTS
const emit = defineEmits(["updateLimitPerPage", "updateCurrentPage"]);

const onChangePage = (page: number | string) => {
  emit("updateCurrentPage", page);
};

const onChangeLimit = (limit: number) => {
  emit("updateLimitPerPage", limit);
  emit("updateCurrentPage", 1);
};

// CONSTS
const optPagination = [
  { label: "Mostrar 10", value: 10 },
  { label: "Mostrar 20", value: 20 },
  { label: "Mostrar 30", value: 30 },
  { label: "Mostrar 40", value: 40 },
  { label: "Mostrar 50", value: 50 },
];

// SPECIFIC IN THIS PROJECT
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

const nameMapping = {
  uid: "uid",
  id: "ID",
  time: "Hora",
  detail: "Detalle",
  client: "Cliente",
  total: "Total",
  status: "Estado",
} as const;

const getTranslatedLabel = (name: keyof typeof nameMapping): string => {
  return nameMapping[name] || name;
};

// DRAWER
const showOrderDrawer = ref(false);
const isLoadingDrawer = ref(false);
const selectedOrderId = ref<number | null>(null);
const loadingUid = ref<string | null>(null);

const navigateToOrder = async (orderUid: string, orderId: number) => {
  try {
    loadingUid.value = orderUid;
    await globalStore.getOrderDetail(orderUid);

    showOrderDrawer.value = true;

    localStorage.setItem("currentOrderId", orderUid);
    selectedOrderId.value = orderId;

    router.push({ name: "OrderDetail", params: { id: Number(orderId) } });
  } catch (error) {
    console.error("Error al obtener el detalle de la orden:", error);
  } finally {
    isLoadingDrawer.value = false;
    loadingUid.value = null;
  }
};

const closeDrawer = () => {
  showOrderDrawer.value = false;
  router.push("/");
};

watchEffect(() => {
  if (route.name === "OrderDetail") {
    showOrderDrawer.value = true;
  } else {
    showOrderDrawer.value = false;
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
  @apply md:max-h-[calc(100vh_-_558px)];
  @apply lg:max-h-[calc(100vh_-_486px)];
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
  @apply py-4 flex flex-col items-center justify-between gap-y-6;
  @apply lg:py-6 lg:flex-row lg:sticky lg:bottom-0 lg:bg-white;
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
