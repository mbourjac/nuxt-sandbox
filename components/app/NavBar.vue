<template>
  <nav class="flex justify-between p-4">
    <NuxtLink to="/" class="flex items-center gap-2 font-medium">
      <AppLogo />
      <span>Travel Map</span>
    </NuxtLink>
    <div class="flex gap-2">
      <AppThemeToggle />
      <AppAuthButton />
    </div>
  </nav>
</template>
