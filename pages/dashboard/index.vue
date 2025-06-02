<script lang="ts" setup>
import { useSidebar } from '~/components/ui/sidebar';

const mapStore = useMapStore();
const locationStore = useLocationStore();
const { locations, status } = storeToRefs(locationStore);
const { state, isMobile } = useSidebar();

onMounted(() => {
  locationStore.refresh();
});
</script>

<template>
  <div class="flex flex-col gap-8">
    <div class="flex flex-col gap-4">
      <h1 class="text-xl font-medium">Locations</h1>
      <div v-if="status === 'pending'" class="flex flex-wrap gap-2">
        <Card
          v-for="index in 4"
          :key="index"
          class="bg-primary/10 h-[92px] w-[240px] animate-pulse border-none"
        ></Card>
      </div>
      <div
        v-else-if="locations && locations.length > 0"
        class="flex flex-nowrap gap-2 overflow-x-auto pb-3"
        :style="{
          maxWidth: `calc(100vw - ${isMobile ? 2 : state === 'collapsed' ? 7.125 : 18}rem)`,
        }"
      >
        <Card
          v-for="location in locations"
          :key="location.id"
          :class="[
            'h-[92px] w-[240px] shrink-0 transition-all duration-300 hover:cursor-pointer',
            {
              'border-black/40 dark:border-white/40':
                location.id === mapStore.selectedPoint?.id,
            },
          ]"
          @mouseenter="mapStore.selectedPoint = location"
          @mouseleave="mapStore.selectedPoint = null"
        >
          <CardHeader>
            <CardTitle class="truncate">{{ location.name }}</CardTitle>
            <CardDescription class="truncate">{{
              location.description
            }}</CardDescription>
          </CardHeader>
        </Card>
      </div>
      <template v-else>
        <p class="text-sm">Add a location to get started.</p>
        <Button as-child class="w-fit">
          <NuxtLink to="/dashboard/add">Add location</NuxtLink>
        </Button>
      </template>
    </div>
  </div>
</template>
