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
      // Filter out connector nodes and handle trigger node's parent
      const filteredData = noteData
        .filter((item) => item.type !== "dateTimeConnector")
        .map((item) => ({
          ...item,
          parentId: item.parentId === -1 ? undefined : item.parentId,
        }));

      // Create visual nodes with positions and metadata
      this.nodes = filteredData.map((item) => ({
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
      }));

      this.edges = filteredData
        .filter((item) => item.parentId)
        .map((item) => {
          let parentId = item.parentId;
          const parent = noteData.find((n) => n.id === parentId);

          // Skip connector nodes and connect directly to their parent
          if (parent && parent.type === "dateTimeConnector") {
            parentId = parent.parentId;
          }

          // Determine if this is a success or failure path
          // Only add labels for paths coming from dateTime node
          const parentNode = noteData.find((n) => n.id === parentId);
          const isFromDateTime = parentNode?.type === "dateTime";
          const isSuccessPath =
            isFromDateTime &&
            item.data?.payload?.[0]?.text?.includes("welcome");

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
  },
});
