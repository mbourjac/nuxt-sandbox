import { useMapStore } from './map';

export const useLocationStore = defineStore('useLocationStore', () => {
  const {
    data: locations,
    status,
    refresh,
  } = useFetch('/api/locations', {
    lazy: true,
    server: true,
  });

  const sidebarStore = useSidebarStore();
  const mapStore = useMapStore();

  watchEffect(() => {
    if (locations.value) {
      sidebarStore.sidebarItems = locations.value.map(({ id, name }) => ({
        id: `location-${id}`,
        label: name,
        href: '#',
      }));

      mapStore.mapPoints = locations.value.map(({ id, name, lat, long }) => ({
        id,
        label: name,
        coordinates: {
          longitude: long,
          latitude: lat,
        },
      }));
    }

    sidebarStore.isLoading = status.value === 'pending';
  });

  return {
    locations,
    status,
    refresh,
  };
});
