export type SidebarItem = {
  id: string;
  label: string;
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
