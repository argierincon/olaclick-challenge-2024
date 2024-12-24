<template>
  <transition name="fade">
    <div v-show="isOverlayVisible" class="overlay">
      <transition name="slide-down">
        <div v-if="isSnackVisible">
          <div class="snackbar" :class="typeClass">
            <span>{{ message }}</span>
            <button @click="closeSnack">
              <Icon name="CloseSmall" />
            </button>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from "vue";
import Icon from "./Icon.vue";

interface IProps {
  isSnackVisible?: boolean;
  message: string;
  type: string;
  duration: number;
}

const props = withDefaults(defineProps<IProps>(), {
  isSnackVisible: false,
  duration: 3000,
});

const isOverlayVisible = ref(false);
const isSnackVisible = ref(false);

onMounted(() => {
  if (props.isSnackVisible) {
    show();
  }
});

const show = () => {
  isOverlayVisible.value = true;
  setTimeout(() => {
    isSnackVisible.value = true;
  }, 80);

  setTimeout(() => {
    closeSnack();
  }, props.duration);
};

const emit = defineEmits(["close"]);

const closeSnack = () => {
  emit("close");

  isSnackVisible.value = false;
  setTimeout(() => {
    isOverlayVisible.value = false;
  }, 20);
};

watch(
  () => props.isSnackVisible,
  (newVal) => {
    if (newVal) {
      show();
    } else {
      closeSnack();
    }
  }
);

const typeClass = computed(() => {
  switch (props.type) {
    case "success":
      return "snackbar-success";
    case "warning":
      return "snackbar-warning";
    case "error":
      return "snackbar-error";
    default:
      return "snackbar-info";
  }
});
</script>

<style lang="postcss" scoped>
.overlay {
  @apply fixed inset-5 flex justify-end items-start pointer-events-none;
}

.snackbar {
  @apply w-80 p-4 pr-6 flex items-center justify-between z-10;
  @apply rounded-lg font-medium text-white text-start;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  pointer-events: auto;
}

.snackbar-success {
  background-color: #3ab54a;
}

.snackbar-warning {
  background-color: #ebbe05;
}

.snackbar-error {
  background-color: #f9346f;
}

.snackbar-info {
  background-color: #008cff;
}

button {
  @apply cursor-pointer text-xl;
}

/* TRANSITIONS STYLES */
/* overlay */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* slide-down */
.slide-down-enter-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.slide-down-leave-active {
  transition: transform 0.15s ease, opacity 0.15s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  @apply -translate-y-full opacity-0;
}

.slide-down-enter-to,
.slide-down-leave-from {
  @apply translate-y-0 opacity-100;
}
</style>
