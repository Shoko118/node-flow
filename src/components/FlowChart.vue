<script setup lang="ts">
import { useVueFlow, VueFlow } from "@vue-flow/core";
import { Background } from "@vue-flow/background";
import CustomNode from "./CustomNode.vue";
import { useFlowStore } from "@/stores/useFlowStore";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { markRaw } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const flowStore = useFlowStore();
const { nodes, edges } = storeToRefs(flowStore);

const { fitView, onConnect, addEdges, onNodeClick } = useVueFlow();

const nodeTypes = {
  custom: markRaw(CustomNode),
};

onMounted(() => {
  flowStore.initializeFlow();

  setTimeout(() => {
    fitView({ padding: 0.2 });
  }, 0);
});

onConnect((params) => addEdges([params]));

onNodeClick(({ node }) => {
  router.push(`/${node.id}`);
});
</script>

<template>
  <div class="p-4">
    <div class="w-[800px] h-[600px] border rounded-lg bg-gray-50">
      <VueFlow :nodes="nodes" :edges="edges" :node-types="nodeTypes as any">
        <Background class="bg-gray-50" />
      </VueFlow>
    </div>
  </div>
</template>

<style>
@import "@vue-flow/core/dist/style.css";
@import "@vue-flow/core/dist/theme-default.css";
</style>
