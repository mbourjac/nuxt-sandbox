<template>
  <div class="bg-muted/50 flex min-h-screen flex-col">
    <AppNavBar />
    <div class="flex flex-1 p-4">
      <main class="flex flex-1 rounded-xl bg-white p-4 dark:bg-black">
        <slot />
      </main>
    </div>
  </div>
</template>
