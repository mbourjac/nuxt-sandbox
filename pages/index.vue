<script lang="ts" setup>
const authStore = useAuthStore();
</script>

<template>
  <div class="flex w-full items-center justify-center gap-12 p-4">
    <div
      class="aspect-square h-[50vh] max-w-full rounded-full bg-black dark:bg-white"
    />
    <div class="flex max-w-[30rem] flex-col gap-2">
      <h1 class="text-2xl font-medium">Travel Map</h1>
      <div class="flex flex-col gap-4">
        <p class="text-balance text-zinc-600 dark:text-zinc-300">
          Keep track of your travels with this simple travel log app. Add
          locations, photos, and notes to create a digital journal of your
          journeys.
        </p>
        <Button v-if="authStore.user" as-child class="w-fit">
          <NuxtLink to="/dashboard">Start logging</NuxtLink>
        </Button>
      </div>
    </div>
  </div>
</template>
