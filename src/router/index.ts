import { createWebHistory, createRouter } from "vue-router";
import FlowChart from "@/components/FlowChart.vue";
import NodeIdDrawer from "@/components/NodeIdDrawer.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: FlowChart,
  },
  {
    path: "/node/:id",
    name: "node-details",
    components: {
      default: FlowChart,
      drawer: NodeIdDrawer,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
