import { defineStore } from "pinia";
import type { Node, Edge } from "@vue-flow/core";
import noteData from "@/features/json/note.json";

interface FlowState {
  nodes: Node[];
  edges: Edge[];
}

export const useFlowStore = defineStore("flow", {
  state: (): FlowState => ({
    nodes: [],
    edges: [],
  }),

  actions: {
    getNodePosition(item: any): { x: number; y: number } {
      // Top center
      if (item.type === "trigger") {
        return { x: 400, y: 0 };
      }

      // Center below trigger
      if (item.type === "dateTime") {
        return { x: 400, y: 150 };
      }

      if (item.type === "sendMessage") {
        // Left branch
        if (item.data.payload[0].text.includes("welcome")) {
          return { x: 200, y: 300 };
        }

        // Right branch
        return { x: 600, y: 300 };
      }

      // Below Away Message
      if (item.type === "addComment") {
        return { x: 600, y: 450 };
      }

      // Default position
      return { x: 400, y: 0 };
    },

    initializeFlow() {
      const processNodeData = (item: any) => ({
        ...item,
        parentId: item.parentId === -1 ? undefined : item.parentId,
      });

      const createNode = (item: any) => ({
        id: item.id.toString(),
        type: "custom",
        position: this.getNodePosition(item),
        data: {
          title:
            item.name || item.type.charAt(0).toUpperCase() + item.type.slice(1),
          description: this.getNodeDescription(item),
          type: item.type,
          ...item.data,
        },
      });

      const createEdge = (item: any, parentId: number) => {
        const parentNode = noteData.find((n) => n.id === parentId);
        const isFromDateTime = parentNode?.type === "dateTime";
        const isSuccessPath =
          isFromDateTime && item.data?.payload?.[0]?.text?.includes("welcome");

        return {
          id: `e${parentId}-${item.id}`,
          source: parentId?.toString() ?? "",
          target: item.id.toString(),
          animated: false,
          type: "smoothstep",
          label: isFromDateTime
            ? isSuccessPath
              ? "Success"
              : "Failure"
            : undefined,
          style: isFromDateTime
            ? {
                stroke: isSuccessPath ? "#22c55e" : "#ef4444",
                strokeWidth: 2,
              }
            : undefined,
        };
      };

      const getParentId = (item: any) => {
        const parent = noteData.find((n) => n.id === item.parentId);
        return parent?.type === "dateTimeConnector"
          ? parent.parentId
          : item.parentId;
      };

      const filteredData = noteData
        .filter((item) => item.type !== "dateTimeConnector")
        .map(processNodeData);

      this.nodes = filteredData.map(createNode);

      this.edges = filteredData
        .filter((item) => item.parentId)
        .map((item) => {
          const parentId = getParentId(item);
          return createEdge(item, parentId);
        });
    },

    getNodeDescription(item: any): string {
      switch (item.type) {
        case "trigger":
          return "Conversation trigger";
        case "sendMessage":
          return item.data.payload[0].text;
        case "dateTime":
          return "Check if within business hours";
        case "addComment":
          return item.data.comment;
        default:
          return "";
      }
    },

    addNode(nodeData: { title: string; description: string; type: string }) {
      const newNode: Node = {
        id: `node-${Date.now()}`,
        type: "custom",
        position: { x: 100, y: 100 },
        data: nodeData,
      };
      this.nodes.push(newNode);
    },

    getNodeById(id: string) {
      return this.nodes.find((node) => node.id === id);
    },

    updateNode(
      id: string,
      nodeData: { title: string; description: string; type: string }
    ) {
      const nodeIndex = this.nodes.findIndex((node) => node.id === id);
      if (nodeIndex === -1) return;

      this.nodes[nodeIndex] = {
        ...this.nodes[nodeIndex],
        data: {
          ...this.nodes[nodeIndex].data,
          ...nodeData,
        },
      };
    },
  },
});
