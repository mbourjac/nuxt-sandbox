import type { MapPoint } from './map';

export type SidebarItem = {
  location: MapPoint;
  href: string;
};

export const useSidebarStore = defineStore('useSidebarStore', () => {
  const sidebarItems = ref<SidebarItem[]>([]);
  const isLoading = ref(false);

  return {
    sidebarItems,
    isLoading,
  };
});
