<template>
  <nav class="flex justify-between p-4">
    <NuxtLink to="/" class="flex items-center gap-2 font-medium">
      <AppLogo />
      <span>Travel Map</span>
    </NuxtLink>
    <Button as-child>
      <NuxtLink to="/sign-in"> Sign in </NuxtLink>
    </Button>
  </nav>
</template>
