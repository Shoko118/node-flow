import { createMemoryHistory, createRouter } from "vue-router";
import FlowChart from "@/components/FlowChart.vue";
import NodeIdDrawer from "@/components/NodeIdDrawer.vue";

const routes = [
  {
    path: "/",
    component: FlowChart,
  },
  {
    path: "/:id",
    component: NodeIdDrawer,
  },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
