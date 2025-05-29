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

  watchEffect(() => {
    if (locations.value) {
      sidebarStore.sidebarItems = locations.value.map(({ id, name }) => ({
        id: `location-${id}`,
        label: name,
        href: '#',
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
