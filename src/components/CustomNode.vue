<script setup lang="ts">
import { Handle, Position } from "@vue-flow/core";
import { MessageSquare, MessageCircle, Clock, Zap } from "lucide-vue-next";
import { computed } from "vue";

const { data } = defineProps<{
  data: {
    title?: string;
    description?: string;
    type?: "sendMessage" | "addComment" | "businessHours";
  };
}>();

const nodeTitle = computed(() => data?.title);
const nodeDescription = computed(() => data?.description);
const nodeType = computed(() => data?.type);

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
</script>

<template>
  <div
    class="hover:shadow-xl transition-shadow duration-200 rounded-lg bg-white shadow-lg p-4 max-w-[200px] border border-gray-200"
  >
    <Handle type="target" :position="Position.Top" class="w-3 h-3" />

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
