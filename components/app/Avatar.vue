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
  <Avatar v-if="authStore.user?.image">
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
</template>
