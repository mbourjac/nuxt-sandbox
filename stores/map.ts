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

  return { mapPoints };
});
