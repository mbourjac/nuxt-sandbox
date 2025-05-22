<script lang="ts" setup>
const authStore = useAuthStore();
</script>

<template>
  <div class="grid flex-1">
    <span class="truncate text-sm font-medium">{{ authStore.user?.name }}</span>
    <span class="truncate text-xs">{{ authStore.user?.email }}</span>
  </div>
</template>
