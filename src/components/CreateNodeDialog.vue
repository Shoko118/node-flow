<script setup lang="ts">
import { ref } from "vue";
import { useFlowStore } from "@/stores/useFlowStore";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const flowStore = useFlowStore();

const isOpen = ref<boolean>(false);
const errors = ref<{
  title?: string;
  description?: string;
  type?: string;
}>({});

const formData = ref<{
  title: string;
  description: string;
  type: string;
}>({
  title: "",
  description: "",
  type: "",
});

const nodeTypes = [
  { value: "sendMessage", label: "Send Message" },
  { value: "addComment", label: "Add Comment" },
  { value: "businessHours", label: "Business Hours" },
] as const;

function validateForm(): boolean {
  errors.value = {};
  let isValid = true;

  if (!formData.value.title.trim()) {
    errors.value.title = "Title is required";
    isValid = false;
  }

  if (!formData.value.description.trim()) {
    errors.value.description = "Description is required";
    isValid = false;
  }

  if (!formData.value.type) {
    errors.value.type = "Please select a node type";
    isValid = false;
  }

  return isValid;
}

function handleSubmit() {
  if (!validateForm()) return;

  flowStore.addNode({
    title: formData.value.title,
    description: formData.value.description,
    type: formData.value.type,
  });

  // Reset form and errors
  formData.value.title = "";
  formData.value.description = "";
  formData.value.type = "";
  errors.value = {};

  // Close modal
  isOpen.value = false;
}

function handleClose() {
  isOpen.value = false;
  formData.value.title = "";
  formData.value.description = "";
  formData.value.type = "";
  errors.value = {};
}
</script>

<template>
  <Dialog :open="isOpen" @update:open="handleClose">
    <DialogTrigger asChild>
      <Button @click="isOpen = true">Create Node</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create New Node</DialogTitle>
        <DialogDescription>
          Add a new node to your flow chart.
        </DialogDescription>
      </DialogHeader>
      <form @submit.prevent="handleSubmit">
        <div class="grid gap-4 py-4">
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="title" class="text-right">Title</Label>
            <div class="col-span-3">
              <Input
                id="title"
                v-model="formData.title"
                :class="{ 'border-red-500': errors.title }"
              />
              <span v-if="errors.title" class="text-sm text-red-500 mt-1">
                {{ errors.title }}
              </span>
            </div>
          </div>

          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="description" class="text-right">Description</Label>
            <div class="col-span-3">
              <Input
                id="description"
                v-model="formData.description"
                :class="{ 'border-red-500': errors.description }"
              />
              <span v-if="errors.description" class="text-sm text-red-500 mt-1">
                {{ errors.description }}
              </span>
            </div>
          </div>

          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="type" class="text-right">Type of Node</Label>
            <div class="col-span-3">
              <Select
                v-model="formData.type"
                :class="{ 'border-red-500': errors.type }"
              >
                <SelectTrigger class="col-span-3">
                  <SelectValue placeholder="Select node type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    v-for="nodeType in nodeTypes"
                    :key="nodeType.value"
                    :value="nodeType.value"
                  >
                    {{ nodeType.label }}
                  </SelectItem>
                </SelectContent>
              </Select>
              <span v-if="errors.type" class="text-sm text-red-500 mt-1">
                {{ errors.type }}
              </span>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button type="submit">Create</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
