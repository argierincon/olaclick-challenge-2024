<template>
  <transition name="fade">
    <div v-show="isOverlayVisible" class="overlay" @click="handleOverlayClick">
      <transition name="slide-right">
        <div v-if="isDrawerVisible" class="modal">
          <slot></slot>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";

interface IProps {
  isDrawerVisible?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  isDrawerVisible: false,
});

const isOverlayVisible = ref(false);
const isDrawerVisible = ref(false);

onMounted(() => {
  if (props.isDrawerVisible) {
    showOverlayAndDrawer();
  }
});

const showOverlayAndDrawer = () => {
  isOverlayVisible.value = true;
  setTimeout(() => {
    isDrawerVisible.value = true;
  }, 80);
};

const emit = defineEmits(["close"]);

const closeDrawer = () => {
  emit("close");

  isDrawerVisible.value = false;
  setTimeout(() => {
    isOverlayVisible.value = false;
  }, 200);
};

const handleOverlayClick = () => {
  closeDrawer();
};

watch(
  () => props.isDrawerVisible,
  (newVal) => {
    if (newVal) {
      showOverlayAndDrawer();
    } else {
      closeDrawer();
    }
  }
);
</script>

<style lang="postcss" scoped>
.overlay {
  @apply fixed inset-0 bg-[#c4ced861] flex items-end justify-center;
  @apply lg:items-center;
}

.modal {
  @apply h-full w-full flex flex-col gap-y-6 fixed right-0 top-0 z-10 bg-white shadow-lg;
  @apply md:w-[50%];
  transition: transform 0.3s ease-in-out;
}

/* overlay */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

/* slide */
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.3s ease-in-out;
}

.slide-right-enter-from {
  transform: translateX(100%);
}

.slide-right-enter-to {
  transform: translateX(0);
}

.slide-right-leave-from {
  transform: translateX(0);
}

.slide-right-leave-to {
  transform: translateX(100%);
}
</style>
