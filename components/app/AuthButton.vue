<script lang="ts" setup>
const authStore = useAuthStore();
</script>

<template>
  <DropdownMenu v-if="!authStore.isLoading && authStore.user">
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="size-8 rounded-full">
        <AppAvatar />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-42" side="bottom" align="end">
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem class="justify-between" @click="authStore.signOut">
        <span>Sign out</span>
        <Icon name="tabler:logout-2" />
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  <Button v-else :disabled="authStore.isLoading" @click="authStore.signIn">
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
</template>
