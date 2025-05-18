<template>
  <nav class="flex justify-between p-4">
    <NuxtLink to="/">
      <AppLogo />
    </NuxtLink>
    <Button as-child>
      <NuxtLink to="/sign-in"> Sign in </NuxtLink>
    </Button>
  </nav>
</template>
