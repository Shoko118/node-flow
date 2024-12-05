<script setup lang="ts">
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useRoute, useRouter } from "vue-router";
import { onMounted } from "vue";
import { useFlowStore } from "@/stores/useFlowStore";

const route = useRoute();
const router = useRouter();

const flowStore = useFlowStore();
const { getNodeById } = flowStore;

const handleClose = () => {
  router.push({ name: "home" });
};

onMounted(() => {
  console.log(getNodeById(route.params.id as string));
});
</script>

<template>
  <Drawer :open="true" @close="handleClose" direction="right">
    <DrawerContent direction="right">
      <DrawerHeader>
        <DrawerTitle>Node id: {{ route.params.id }}</DrawerTitle>
      </DrawerHeader>
      <div class="px-4 py-2">
        <!-- <Input v-model="nodeTitle" />
        <Input v-model="nodeDescription" /> -->
      </div>
      <DrawerFooter>
        <DrawerClose asChild>
          <Button variant="outline" @click="handleClose">Close</Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
</template>
