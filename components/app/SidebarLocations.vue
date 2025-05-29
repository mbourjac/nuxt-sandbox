<script setup lang="ts">
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

const sidebarStore = useSidebarStore();
</script>

<template>
  <SidebarGroup class="group-data-[collapsible=icon]:hidden">
    <SidebarGroupLabel>Locations</SidebarGroupLabel>
    <ClientOnly>
      <SidebarMenu>
        <template v-if="sidebarStore.isLoading">
          <SidebarMenuItem v-for="index in 4" :key="index">
            <SidebarMenuButton as-child>
              <Skeleton class="h-4 w-full" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </template>
        <template
          v-if="
            sidebarStore.sidebarItems && sidebarStore.sidebarItems.length > 0
          "
        >
          <SidebarMenuItem
            v-for="{ id, label, href } in sidebarStore.sidebarItems"
            :key="id"
          >
            <SidebarMenuButton as-child>
              <NuxtLink :href="href">
                <Icon name="tabler:map-pin-filled" />
                <span>{{ label }}</span>
              </NuxtLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </template>
        <SidebarMenuItem v-else class="px-2 text-xs"
          >You have no location yet.</SidebarMenuItem
        >
      </SidebarMenu>
    </ClientOnly>
  </SidebarGroup>
</template>
