<template>
  <div class="layout">
    <Header class="layout__header" @toggle-sidebar="onOpenSidebar" />
    <Sidebar :isSidebarVisible="isSidebarVisible" class="layout__sidebar" />
    <main class="layout__main">
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

const isSidebarVisible = ref(true);

const onOpenSidebar = (newVisibility: boolean) => {
  isSidebarVisible.value = !newVisibility;
};
</script>

<style lang="postcss" scoped>
.layout {
  @apply h-[100vh] px-4;
  @apply md:grid;
  @apply md:grid-rows-[96px_1fr] md:grid-cols-[230px_1fr] md:gap-x-4;
  @apply lg:grid-cols-[280px_1fr];

  grid-template-areas:
    "nav nav"
    "sidebar main";
}

.layout__header {
  grid-area: nav;
}

.layout__sidebar {
  grid-area: sidebar;
}

.layout__main {
  @apply h-[calc(100%_-_16px)];
  grid-area: main;

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
