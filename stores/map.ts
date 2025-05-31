export type MapPoints = {
  id: number;
  label: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
};

export const useMapStore = defineStore('useMapStore', () => {
  const mapPoints = ref<MapPoints[]>([]);

  const init = async () => {
    const { useMap } = await import('@indoorequal/vue-maplibre-gl');
    const { LngLatBounds } = await import('maplibre-gl');

    const map = useMap();

    effect(() => {
      const firstPoint = mapPoints.value[0];

      if (!firstPoint) return;

      const bounds = mapPoints.value.reduce(
        (bounds, point) => {
          return bounds.extend([
            point.coordinates.longitude,
            point.coordinates.latitude,
          ]);
        },
        new LngLatBounds(
          [firstPoint.coordinates.longitude, firstPoint.coordinates.latitude],
          [firstPoint.coordinates.longitude, firstPoint.coordinates.latitude]
        )
      );

      map.map?.fitBounds(bounds, {
        padding: 50,
      });
    });
  };

  return { init, mapPoints };
});
