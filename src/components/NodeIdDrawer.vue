<script setup lang="ts">
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { useFlowStore } from "@/stores/useFlowStore";

const route = useRoute();
const router = useRouter();

const flowStore = useFlowStore();
const { getNodeById, updateNode } = flowStore;

// Create reactive refs for the form fields
const nodeTitle = ref("");
const nodeDescription = ref("");
const nodeType = ref("");

const handleClose = () => {
  router.push({ name: "home" });
};

const handleSubmit = () => {
  // Update the node with new data
  updateNode(route.params.id as string, {
    title: nodeTitle.value,
    description: nodeDescription.value,
    type: nodeType.value,
  });

  // Close the drawer after updating
  handleClose();
};

onMounted(() => {
  // Get the current node data and populate the form
  const node = getNodeById(route.params.id as string);
  if (node) {
    nodeTitle.value = node.data.title;
    nodeDescription.value = node.data.description;
    nodeType.value = node.data.type;
  }
});
</script>

<template>
  <Drawer :open="true" @close="handleClose" direction="right">
    <DrawerContent direction="right">
      <DrawerHeader>
        <DrawerTitle>Edit Node: {{ route.params.id }}</DrawerTitle>
      </DrawerHeader>
      <div class="px-4 py-2 space-y-4">
        <div class="space-y-2">
          <label for="title" class="text-sm font-medium">Title</label>
          <Input
            id="title"
            v-model="nodeTitle"
            placeholder="Enter node title"
          />
        </div>
        <div class="space-y-2">
          <label for="description" class="text-sm font-medium"
            >Description</label
          >
          <Input
            id="description"
            v-model="nodeDescription"
            placeholder="Enter node description"
          />
        </div>
      </div>
      <DrawerFooter class="space-x-2">
        <Button variant="outline" @click="handleClose">Cancel</Button>
        <Button @click="handleSubmit">Save Changes</Button>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
</template>
