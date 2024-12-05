<script lang="ts" setup>
import type { DrawerRootEmits } from "vaul-vue";
import { useForwardPropsEmits } from "radix-vue";
import { DrawerRoot } from "vaul-vue";

interface Props {
  direction?: "right" | "bottom";
}

const props = withDefaults(defineProps<Props>(), {
  shouldScaleBackground: true,
  direction: "bottom",
});

const emits = defineEmits<DrawerRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <DrawerRoot v-bind="forwarded">
    <slot />
  </DrawerRoot>
</template>
