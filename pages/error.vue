<script lang="ts" setup>
const route = useRoute();
const error = route.query.error || 'An unknow error occured';
</script>

<template>
  <div class="flex w-full items-center justify-center p-4">
    <Card class="w-[21.875rem]">
      <CardHeader>
        <CardTitle>Something went wrong</CardTitle>
        <CardDescription>{{ error }}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button as-child class="w-full">
          <NuxtLink to="/">Back to Home</NuxtLink>
        </Button>
      </CardContent>
    </Card>
  </div>
</template>
