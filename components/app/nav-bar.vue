<script lang="ts" setup>
const authStore = useAuthStore();
</script>

<template>
  <nav class="flex justify-between p-4">
    <NuxtLink to="/" class="flex items-center gap-2 font-medium">
      <AppLogo />
      <span>Travel Map</span>
    </NuxtLink>
    <div class="flex gap-2">
      <AppThemeToggle />
      <Button
        class="cursor-pointer"
        :disabled="authStore.isLoading"
        @click="authStore.signIn"
      >
        <span>Sign in</span>
        <Icon
          v-if="authStore.isLoading"
          name="tabler:loader-2"
          class="animate-spin text-white dark:text-black"
        />
        <Icon
          v-else
          name="tabler:brand-github-filled"
          class="text-white dark:text-black"
        />
      </Button>
    </div>
  </nav>
</template>
