<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
});

const route = useRoute();
const locationStore = useLocationStore();

onMounted(() => {
  if (route.path !== '/dashboard') {
    locationStore.refresh();
  }
});
</script>

<template>
  <div class="flex w-full flex-col gap-1 p-4 pt-0">
    <NuxtPage />
    <AppMap />
  </div>
</template>
