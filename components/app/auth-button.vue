<script lang="ts" setup>
const authStore = useAuthStore();

const userInitials = computed(() => {
  const name = authStore.user?.name?.trim() ?? '';

  if (!name) return '';

  const parts = name.split(' ').filter(Boolean);

  const initials = parts
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');

  return initials;
});
</script>

<template>
  <DropdownMenu v-if="!authStore.isLoading && authStore.user">
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="size-8 cursor-pointer rounded-full">
        <Avatar v-if="authStore.user.image">
          <AvatarImage
            :src="authStore.user.image"
            :alt="authStore.user.name"
            draggable="false"
          />
          <AvatarFallback
            class="bg-black text-sm text-white dark:bg-white dark:text-black"
          >
            <span>{{ userInitials }}</span>
          </AvatarFallback>
        </Avatar>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-42" side="bottom" align="end">
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        class="cursor-pointer justify-between"
        @click="authStore.signOut"
      >
        <span>Sign out</span>
        <Icon name="tabler:logout-2" />
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  <Button
    v-else
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
</template>
