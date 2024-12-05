<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();
const id = route.params.id;
</script>

<template>
  <div class="border rounded-lg p-4 bg-white shadow-sm">
    <h3 class="text-lg font-semibold mb-2">Node Details</h3>
    <div>Node ID: {{ id }}</div>
  </div>
</template>
