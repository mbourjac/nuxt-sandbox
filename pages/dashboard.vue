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
  <div
    :class="[
      'flex w-full p-4 pt-0',
      { 'flex-col gap-1': route.path === '/dashboard' },
      { 'gap-4': route.path === '/dashboard/add' },
    ]"
  >
    <NuxtPage />
    <AppMap />
  </div>
</template>
