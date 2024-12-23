<template>
  <component v-bind="$attrs" :is="icons[name]" v-if="icons[name]" />
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import ArrowLeft from "../icons/ArrowLeft.vue";
import Calendar from "../icons/Calendar.vue";
import ChevronLeft from "../icons/ChevronLeft.vue";
import ChevronRight from "../icons/ChevronRight.vue";
import Clock from "../icons/Clock.vue";
import Close from "../icons/Close.vue";
import CloseCircle from "../icons/CloseCircle.vue";
import CloseSmall from "../icons/CloseSmall.vue";
import Edit from "../icons/Edit.vue";
import Eye from "../icons/Eye.vue";
import Info from "../icons/Info.vue";
import Magnify from "../icons/Magnify.vue";
import MenuBurger from "../icons/MenuBurger.vue";
import Plus from "../icons/Plus.vue";
import Spinner from "../icons/Spinner.vue";
import Trash from "../icons/Trash.vue";

const icons = {
  ArrowLeft,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Close,
  CloseCircle,
  CloseSmall,
  Edit,
  Eye,
  Info,
  Magnify,
  MenuBurger,
  Plus,
  Spinner,
  Trash,
} as const;

export type TIconNames = keyof typeof icons;

defineProps({
  name: {
    type: String as () => TIconNames,
    required: true,
  },
});
</script>
