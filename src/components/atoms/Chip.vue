<template>
  <div :class="chipClasses" @click="clickable ? onClick() : null">
    <span>{{ label }}</span>
    <button v-if="removable" class="ml-2 text-red-500" @click.stop="removeChip">
      ✖
    </button>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

export type TChipType = "default" | "success" | "info" | "warning" | "error";

export type TTooltipPlacement = "top" | "bottom";

interface IChipProps {
  label: string;
  type?: TChipType;
  removable?: boolean;
  size?: "small" | "medium";
  light?: boolean;
  clickable?: boolean;
}

const props = withDefaults(defineProps<IChipProps>(), {
  type: "default",
  removable: false,
  size: "medium",
  light: false,
  clickable: false,
});

const emit = defineEmits(["remove"]);

const chipClasses = computed(() => {
  const baseClasses = "chip";
  const sizeClasses = props.size === "small" ? "small" : "medium";
  const cursorClass = props.clickable ? "cursor-pointer" : "cursor-default";
  const typeClass = getTypeClasses(props.type, props.light);

  return `${baseClasses} ${sizeClasses} ${typeClass} ${cursorClass}`;
});

const getTypeClasses = (
  type: TChipType | undefined,
  light: boolean | undefined
) => {
  const baseClasses: Record<TChipType, string> = {
    default: "default",
    info: "info",
    success: "success",
    warning: "warning",
    error: "error",
  };

  if (light) {
    return `light ${baseClasses[type ?? "default"]}`;
  }

  return baseClasses[type ?? "default"];
};

const onClick = () => {
  console.log(`Chip clicked: ${props.label}`);
};

const removeChip = () => {
  emit("remove", props.label);
};
</script>

<style lang="postcss" scoped>
.chip {
  @apply inline-flex items-center font-medium rounded-full;
}

.small {
  @apply px-3 py-[6px] text-xs;
}

.medium {
  @apply px-4 py-2 text-sm;
}

.default {
  @apply bg-[#F0F0F0] text-[#2F2E41];
}

.success {
  @apply bg-[#3EC14F] text-white;
}

.info {
  @apply bg-[#249CFF] text-white;
}

.warning {
  @apply bg-[#ecbe41] text-white;
}

.error {
  @apply bg-[#FA5B8B] text-white;
}

.light {
  &.success {
    @apply bg-[#E7FDF9] text-[#2A8732];
  }

  &.info {
    @apply bg-[#F0F5FF] text-[#0076D6];
  }

  &.warning {
    @apply bg-[#fffdd6] text-[#D2AA04];
  }

  &.error {
    @apply bg-[#FFF5F5] text-[#F9346F];
  }
}
</style>
