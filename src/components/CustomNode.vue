<script setup lang="ts">
import { Handle, Position } from "@vue-flow/core";
import {
  MessageSquare,
  MessageCircle,
  Clock,
  Zap,
  Trash2,
} from "lucide-vue-next";
import { computed, ref } from "vue";
import { useFlowStore } from "@/stores/useFlowStore";

const flowStore = useFlowStore();

const props = defineProps<{
  id: string;
  data: {
    title?: string;
    description?: string;
    type?: "sendMessage" | "addComment" | "businessHours";
  };
}>();

const showDeleteButton = ref(false);

const nodeTitle = computed(() => props.data?.title);
const nodeDescription = computed(() => props.data?.description);
const nodeType = computed(() => props.data?.type);

const getNodeIcon = (type: string) => {
  switch (type) {
    case "sendMessage":
      return MessageSquare;
    case "addComment":
      return MessageCircle;
    case "businessHours":
      return Clock;
    default:
      return Zap;
  }
};

const handleDelete = () => {
  flowStore.deleteNode(props.id);
};
</script>

<template>
  <div
    class="relative hover:shadow-xl transition-shadow duration-200 rounded-lg bg-white shadow-lg p-4 max-w-[200px] border border-gray-200"
    @mouseenter="showDeleteButton = true"
    @mouseleave="showDeleteButton = false"
  >
    <Handle type="target" :position="Position.Top" class="w-3 h-3" />

    <div
      v-show="showDeleteButton"
      class="absolute -top-2 -right-2 z-10 cursor-pointer bg-red-500 hover:bg-red-600 rounded-full p-1.5 transition-colors duration-200"
      @click.stop="handleDelete"
      title="Delete node"
    >
      <Trash2 class="w-3 h-3 text-white" />
    </div>

    <div class="flex items-center gap-2 mb-2">
      <component
        :is="getNodeIcon(nodeType ?? '')"
        class="w-5 h-5 text-gray-600"
      />
      <h3 class="font-medium text-gray-800">{{ nodeTitle }}</h3>
    </div>

    <p class="text-sm text-gray-600 truncate">
      {{ nodeDescription }}
    </p>

    <Handle type="source" :position="Position.Bottom" class="w-3 h-3" />
  </div>
</template>
