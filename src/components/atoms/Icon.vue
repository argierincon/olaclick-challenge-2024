<template>
  <component v-bind="$attrs" :is="icons[name]" v-if="icons[name]" />
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import ArrowLeft from "../icons/ArrowLeft.vue";
import ChevronLeft from "../icons/ChevronLeft.vue";
import ChevronRight from "../icons/ChevronRight.vue";
import Edit from "../icons/Edit.vue";
import Eye from "../icons/Eye.vue";
import MenuBurger from "../icons/MenuBurger.vue";
import Trash from "../icons/Trash.vue";

const icons = {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Edit,
  Eye,
  MenuBurger,
  Trash,
} as const;

type IconNames = keyof typeof icons;

defineProps({
  name: {
    type: String as () => IconNames,
    required: true,
  },
});
</script>
