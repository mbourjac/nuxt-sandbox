<script lang="ts" setup>
const mapStore = useMapStore();

const style = 'https://tiles.openfreemap.org/styles/positron';
const center: [number, number] = [2.333333, 48.866667];
const zoom = 1;
</script>

<template>
  <div class="h-full overflow-hidden rounded-2xl">
    <MglMap :map-style="style" :center="center" :zoom="zoom">
      <MglNavigationControl />
      <MglMarker
        v-for="{ id, label, coordinates } in mapStore.mapPoints"
        :key="id"
        :coordinates="[coordinates.longitude, coordinates.latitude]"
      >
        <template #marker>
          <Tooltip>
            <TooltipTrigger>
              <Icon
                name="tabler:map-pin-filled"
                size="24"
                class="dark:text-black"
            /></TooltipTrigger>
            <TooltipContent>
              <p>{{ label }}</p>
            </TooltipContent>
          </Tooltip>
        </template>
      </MglMarker>
    </MglMap>
  </div>
</template>
