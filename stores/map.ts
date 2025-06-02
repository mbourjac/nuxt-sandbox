import type { LngLatBounds } from 'maplibre-gl';

export type MapPoint = {
  id: number;
  name: string;
  lat: number;
  long: number;
};

export const useMapStore = defineStore('useMapStore', () => {
  const mapPoints = ref<MapPoint[]>([]);
  const selectedPoint = ref<MapPoint | null>(null);

  const init = async () => {
    const { useMap } = await import('@indoorequal/vue-maplibre-gl');
    const { LngLatBounds } = await import('maplibre-gl');

    let bounds: LngLatBounds | null = null;

    const map = useMap();
    const padding = 50;

    effect(() => {
      const firstPoint = mapPoints.value[0];

      if (!firstPoint) return;

      bounds = mapPoints.value.reduce(
        (bounds, point) => {
          return bounds.extend([point.long, point.lat]);
        },
        new LngLatBounds(
          [firstPoint.long, firstPoint.lat],
          [firstPoint.long, firstPoint.lat]
        )
      );

      map.map?.fitBounds(bounds, {
        padding,
      });
    });

    effect(() => {
      if (selectedPoint.value) {
        map.map?.flyTo({
          center: [selectedPoint.value.long, selectedPoint.value.lat],
          speed: 0.8,
        });
      } else if (bounds) {
        map.map?.fitBounds(bounds, {
          padding,
        });
      }
    });
  };

  return { init, mapPoints, selectedPoint };
});
