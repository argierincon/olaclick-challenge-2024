<template>
  <header class="header">
    <div class="header__content">
      <button>
        <Icon name="MenuBurger" />
      </button>

      <h3 class="header__title">Órdenes</h3>
    </div>

    <div class="header__details">
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

      <div class="detail detail--order" @click="onCreateSingleOrder">
        <div class="small-circle"></div>
        <p>Crear una orden</p>
        <span>
          <Icon name="Plus" />
        </span>
      </div>
    </div>
  </header>
</template>

<style lang="postcss" scoped>
.header {
  @apply pt-4 px-4 flex items-center justify-between;
}
</style>

<script setup lang="ts">
import { useGlobalStore } from "../../store";
import Icon from "../atoms/Icon.vue";

import { ref } from "vue";

const globalStore = useGlobalStore();

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

const onCreateSingleOrder = async () => {
  try {
    await globalStore.addSingleOrderToCollection();
  } catch (error) {
    console.error(error);
  }
};
</script>

<style lang="postcss" scoped>
.header {
  @apply flex items-center justify-between;
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
  @apply flex items-center gap-4;

  .detail {
    @apply flex items-center gap-3 py-2 px-3 rounded-full bg-white font-medium;

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
