<template>
  <div class="layout">
    <Header />
    <Sidebar />
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
import Header from "../components/organisms/Header.vue";
import Sidebar from "../components/organisms/Sidebar.vue";
</script>

<style lang="postcss" scoped>
.layout {
  display: grid;
  grid-template-rows: 80px 1fr;
  grid-template-columns: 300px 1fr;
  height: 100vh;
}

.layout > Header {
  grid-column: span 2;
  grid-row: 1;
}

.layout > Sidebar {
  grid-column: 1;
  grid-row: 2;
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
