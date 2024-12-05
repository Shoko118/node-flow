<script lang="ts" setup>
import type { DialogContentEmits, DialogContentProps } from "radix-vue";
import type { HtmlHTMLAttributes } from "vue";
import { cn } from "@/lib/utils";
import { useForwardPropsEmits } from "radix-vue";
import { DrawerContent, DrawerPortal } from "vaul-vue";
import DrawerOverlay from "./DrawerOverlay.vue";

const props = defineProps<
  DialogContentProps & {
    class?: HtmlHTMLAttributes["class"];
    direction?: "left" | "right" | "bottom";
  }
>();
const emits = defineEmits<DialogContentEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerContent
      v-bind="forwarded"
      :class="
        cn(
          'fixed z-50 flex h-auto flex-col border bg-background',
          direction === 'right'
            ? 'inset-y-0 right-0 h-full w-3/4 max-w-sm border-l'
            : 'inset-x-0 bottom-0 mt-24 w-full rounded-t-[10px]',
          props.class
        )
      "
    >
      <div
        v-if="direction === 'bottom'"
        class="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted"
      />
      <slot />
    </DrawerContent>
  </DrawerPortal>
</template>
