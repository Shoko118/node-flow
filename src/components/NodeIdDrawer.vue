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
import { useMediaQuery } from "@/composables/useMediaQuery";

const route = useRoute();
const router = useRouter();

const isMobile = useMediaQuery("(max-width: 600px)");

const flowStore = useFlowStore();
const { getNodeById, updateNode } = flowStore;

// Create reactive refs for the form fields
const nodeTitle = ref("");
const nodeDescription = ref("");
const nodeType = ref("");
const attachments = ref<string[]>([]);
const comments = ref<{ text: string; id: string }[]>([]);
const newComment = ref("");

const handleClose = () => {
  router.push({ name: "home" });
};

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files) {
    const fileNames = Array.from(input.files).map((file) => file.name);
    attachments.value.push(...fileNames);
  }
};

const removeAttachment = (index: number) => {
  attachments.value.splice(index, 1);
};

const addComment = () => {
  if (newComment.value.trim()) {
    comments.value.push({
      text: newComment.value,
      id: Math.random().toString(),
    });

    // Clear the input
    newComment.value = "";
  }
};

const removeComment = (index: number) => {
  comments.value.splice(index, 1);
};

const handleSubmit = () => {
  // Update the node with new data
  updateNode(route.params.id as string, {
    title: nodeTitle.value,
    description: nodeDescription.value,
    type: nodeType.value,
    attachments: attachments.value,
    comments: comments.value,
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
    comments.value = node.data.comments ?? [];
    attachments.value = node.data.attachments ?? [];
  }
});
</script>

<template>
  <Drawer
    :open="true"
    @close="handleClose"
    :direction="isMobile ? 'bottom' : 'right'"
  >
    <DrawerContent :direction="isMobile ? 'bottom' : 'right'">
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
        <div class="space-y-2">
          <label for="attachments" class="text-sm font-medium"
            >File Attachments</label
          >
          <Input
            id="attachments"
            type="file"
            multiple
            @change="handleFileChange"
          />

          <div v-if="attachments.length > 0" class="mt-2">
            <div
              v-for="(fileName, index) in attachments"
              :key="index"
              class="flex items-center justify-between p-2 bg-gray-100 rounded-md mb-2"
            >
              <span class="text-sm truncate">{{ fileName }}</span>
              <Button
                variant="destructive"
                size="sm"
                @click="removeAttachment(index)"
              >
                Remove
              </Button>
            </div>
          </div>
        </div>

        <div class="space-y-2">
          <label for="comments" class="text-sm font-medium">Comments</label>
          <div class="flex gap-2">
            <Input
              id="comments"
              v-model="newComment"
              placeholder="Enter comment"
            />
            <Button @click="addComment">Add</Button>
          </div>

          <div v-if="comments.length > 0" class="mt-2">
            <div
              v-for="(comment, index) in comments"
              :key="comment.id"
              class="p-2 bg-gray-100 rounded-md mb-2"
            >
              <div class="flex justify-between items-center">
                <div>
                  <p class="text-sm">{{ comment.text }}</p>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  @click="removeComment(index)"
                >
                  Remove
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DrawerFooter class="space-x-2">
        <Button variant="outline" @click="handleClose">Cancel</Button>
        <Button @click="handleSubmit">Save Changes</Button>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
</template>
