<template>
  <header class="header">
    <div class="header__content">
      <button @click="onOpenCloseSidebar">
        <Icon name="MenuBurger" />
      </button>

      <h3 class="header__title">Órdenes</h3>
    </div>

    <div class="header__details">
      <div class="flex gap-2">
        <div class="detail detail--time">
          <p>{{ formattedDate }}</p>
          <span>
            <Icon name="Calendar" class="text-blue-600" />
          </span>
        </div>

        <div class="detail detail--time">
          <p>{{ formattedTime }}</p>
          <span>
            <Icon name="Clock" />
          </span>
        </div>
      </div>

      <div class="detail detail--order" @click="onCreateSingleOrder">
        <div class="small-circle"></div>
        <p>Crear una orden</p>
        <span>
          <Icon v-if="isLoading" name="Spinner" />
          <Icon v-else name="Plus" />
        </span>
      </div>
    </div>

    <Snackbar
      v-model:isSnackVisible="showSnack"
      :message="snackbarMsg"
      type="info"
      :duration="3000"
      @close="onClose"
    />
  </header>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useGlobalStore } from "../../store";
import Icon from "../atoms/Icon.vue";
import Snackbar from "../atoms/Snackbar.vue";

const globalStore = useGlobalStore();

const isSidebarVisible = ref(false);

const emit = defineEmits(["toggle-sidebar"]);

const onOpenCloseSidebar = () => {
  isSidebarVisible.value = !isSidebarVisible.value;

  emit("toggle-sidebar", isSidebarVisible.value);
};

const getFormattedDate = () => {
  const date = new Date();

  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  return date.toLocaleDateString("es-ES", options);
};

const formattedDate = ref(getFormattedDate());

const getFormattedTime = () => {
  const date = new Date();

  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  return date.toLocaleTimeString("en-US", options);
};

const formattedTime = ref(getFormattedTime());

let intervalId: ReturnType<typeof setInterval>;

const showSnack = ref(false);

const onClose = () => {
  showSnack.value = false;
};

const snackbarMsg = computed(() => {
  if (globalStore.newOrder) {
    showSnack.value = true;
    return `Se ha creado la orden ID: ${globalStore.newOrder.id} del cliente ${globalStore.newOrder.client}`;
  }
  return "";
});

const isLoading = ref<boolean>(false);

const onCreateSingleOrder = async () => {
  try {
    isLoading.value = true;
    await globalStore.addSingleOrderToCollection();
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  intervalId = setInterval(() => {
    formattedTime.value = getFormattedTime();
  }, 1000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<style lang="postcss" scoped>
.header {
  @apply pt-4 px-4 flex flex-col gap-4;
  @apply md:flex-row md:items-center md:justify-between;
}

.header__content {
  @apply flex items-center gap-x-4;

  button {
    @apply py-3 px-4 bg-white rounded-full text-blue-500 hover:text-blue-300;
  }
}

.header__title {
  @apply text-2xl font-semibold;
}

.header__details {
  @apply flex flex-col gap-4;
  @apply md:flex-row;

  .detail {
    @apply py-2 px-3 flex items-center justify-center gap-3;
    @apply rounded-full bg-white font-medium;

    p {
      @apply text-sm;
    }
  }

  .detail--time {
    span {
      @apply flex p-3 bg-[#F5F9FF] rounded-full text-blue-600;
    }
  }

  .detail--order {
    @apply cursor-pointer;
    @apply transition-all duration-500 ease-in-out;

    .small-circle {
      @apply w-2 h-2 bg-green-600 rounded-full;
    }

    span {
      @apply flex p-3 bg-[#F2FCFA] rounded-full text-green-600;
    }

    &:hover {
      @apply bg-green-100;
      @apply transition-all duration-500 ease-in-out;
    }
  }
}
</style>
