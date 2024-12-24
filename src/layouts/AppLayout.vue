<template>
  <div class="layout">
    <Header class="layout__header" @toggle-sidebar="onOpenSidebar" />
    <Sidebar :isSidebarVisible="isSidebarVisible" class="layout__sidebar" />
    <main class="content">
      <router-view v-slot="{ Component }">
        <transition name="slide" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Header from "../components/organisms/Header.vue";
import Sidebar from "../components/organisms/Sidebar.vue";

const isSidebarVisible = ref(false);

const onOpenSidebar = (newVisibility: boolean) => {
  isSidebarVisible.value = newVisibility;
};
</script>

<style lang="postcss" scoped>
.layout {
  @apply p-4 h-screen;
  @apply md:grid md:grid-rows-[80px,1fr] md:grid-cols-[300px_1fr];
}

.layout__header {
  @apply md:row-start-1 md:col-span-2;
}

.layout__sidebar {
  /* @apply absolute top-0; */
  @apply md:col-span-1 md:row-span-2;
}

.content {
  @apply py-4;
  grid-column: 2;
  grid-row: 2;
  overflow-y: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none; /* Safari y Chrome */
  }
}

::v-deep .slide-enter-active,
::v-deep .slide-leave-active {
  transition: opacity 0.2s ease;
}

::v-deep .slide-enter-from {
  opacity: 0;
}

::v-deep .slide-leave-to {
  opacity: 0;
}
</style>
