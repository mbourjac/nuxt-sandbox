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
      sidebarStore.sidebarItems = locations.value.map((location) => ({
        location,
        href: '#',
      }));

      mapStore.mapPoints = locations.value;
    }

    sidebarStore.isLoading = status.value === 'pending';
  });

  return {
    locations,
    status,
    refresh,
  };
});
