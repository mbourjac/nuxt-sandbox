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
  <div class="flex w-full p-4 pt-0">
    <NuxtPage />
  </div>
</template>
