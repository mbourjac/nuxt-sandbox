<template>
  <nav class="flex justify-between px-6 py-[1.375rem]">
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
