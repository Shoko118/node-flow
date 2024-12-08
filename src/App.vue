<script setup lang="ts">
import CreateNodeDialog from "@/components/CreateNodeDialog.vue";
</script>

<template>
  <div class="overflow-x-hidden">
    <header class="border-b">
      <div class="container flex h-14 items-center px-4">
        <div class="flex flex-1 items-center justify-between">
          <nav>
            <h2 class="text-lg font-semibold">Node Flow Chart</h2>
          </nav>
          <CreateNodeDialog />
        </div>
      </div>
    </header>
    <main class="mx-auto container">
      <div class="flex items-center">
        <router-view></router-view>
        <router-view name="drawer"></router-view>
      </div>
    </main>
  </div>
</template>
