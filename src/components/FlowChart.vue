<script setup lang="ts">
import { useVueFlow, VueFlow } from "@vue-flow/core";
import { Background } from "@vue-flow/background";
import CustomNode from "./CustomNode.vue";
import { useFlowStore } from "@/stores/useFlowStore";
import { storeToRefs } from "pinia";
import { onMounted, watch } from "vue";
import { markRaw } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const flowStore = useFlowStore();
const { nodes, edges } = storeToRefs(flowStore);

const { fitView, onConnect, addEdges, onNodeClick, updateNodeData } =
  useVueFlow();

const nodeTypes = {
  custom: markRaw(CustomNode),
};

onConnect((params) => addEdges([params]));

onNodeClick(({ node }) => {
  router.push(`/node/${node.id}`);
});

onMounted(() => {
  flowStore.initializeFlow();
  setTimeout(() => {
    fitView({ padding: 0.2 });
  }, 0);
});

watch(
  nodes,
  () => {
    nodes.value.map((node) => {
      updateNodeData(node.id, node.data);
    });
    setTimeout(() => {
      fitView({ padding: 0.2 });
    }, 0);
  },
  { deep: true }
);
</script>

<template>
  <div class="p-4">
    <div
      class="w-[350px] md:w-[700px] lg:w-[900px] xl:w-[1300px] h-[600px] border rounded-lg bg-gray-50"
    >
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
