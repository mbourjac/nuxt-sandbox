<script lang="ts" setup>
const colorMode = useColorMode();

const isDark = computed({
  get() {
    return colorMode.value === 'dark';
  },
  set(value: boolean) {
    colorMode.preference = value ? 'dark' : 'light';
  },
});

const label = computed(() =>
  isDark.value ? 'Switch to light mode' : 'Switch to dark mode'
);

const toggleTheme = () => {
  isDark.value = !isDark.value;
};
</script>

<template>
  <Button class="size-9 p-0" variant="ghost" @click="toggleTheme">
    <span class="sr-only">{{ label }}</span>
    <Icon v-if="isDark" name="tabler:sun" size="20" />
    <Icon v-else name="tabler:moon" size="16" />
  </Button>
</template>
