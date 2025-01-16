<template>
  <div v-show="isOverlayVisible" class="overlay">
    <transition name="slide-left">
      <div v-if="isSidebarVisible" class="sidebar">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";

interface IProps {
  isSidebarVisible?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  isSidebarVisible: false,
});

const isOverlayVisible = ref(false);
const isSidebarVisible = ref(false);

onMounted(() => {
  if (props.isSidebarVisible) {
    showOverlayAndDrawer();
  }
});

const showOverlayAndDrawer = () => {
  isOverlayVisible.value = true;
  setTimeout(() => {
    isSidebarVisible.value = true;
  }, 80);
};

const emit = defineEmits(["close"]);

const closeDrawer = () => {
  emit("close");

  isSidebarVisible.value = false;
  setTimeout(() => {
    isOverlayVisible.value = false;
  }, 200);
};

watch(
  () => props.isSidebarVisible,
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
  @apply fixed inset-0 flex justify-start items-start pointer-events-none z-10;
}

.sidebar {
  @apply h-[calc(100%_-_80px)] w-full top-20 bg-white;
  @apply flex flex-col gap-y-6 fixed left-0 bottom-0 z-10;
  @apply md:w-[280px] md:h-[calc(100%_-_112px)] md:top-24 md:bg-transparent;
  @apply lg:w-[320px];
  transition: transform 0.3s ease-in-out;
  pointer-events: auto;
}

/* slide */
.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.3s ease-in-out;
}

.slide-left-enter-from {
  transform: translateX(-100%);
}

.slide-left-enter-to {
  transform: translateX(0);
}

.slide-left-leave-from {
  transform: translateX(0);
}

.slide-left-leave-to {
  transform: translateX(-100%);
}
</style>
