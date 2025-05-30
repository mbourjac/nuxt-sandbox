<script lang="ts" setup>
const style = 'https://tiles.openfreemap.org/styles/positron';
const center: [number, number] = [2.333333, 48.866667];
const zoom = 1;
</script>

<template>
  <div class="h-full overflow-hidden rounded-2xl">
    <MglMap :map-style="style" :center="center" :zoom="zoom">
      <MglNavigationControl />
    </MglMap>
  </div>
</template>
