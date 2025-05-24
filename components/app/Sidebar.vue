<script setup lang="ts">
import type { SidebarProps } from '@/components/ui/sidebar';

const props = withDefaults(defineProps<SidebarProps>(), {
  variant: 'inset',
  collapsible: 'icon',
});

const navItems = [
  {
    label: 'Locations',
    href: '/dashboard',
    iconName: 'tabler:map',
  },
  {
    label: 'Add location',
    href: '/dashboard/add',
    iconName: 'tabler:circle-plus',
  },
];
</script>

<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" as-child>
            <NuxtLink to="/">
              <AppLogo />
              <div class="grid flex-1 truncate text-left text-sm leading-tight">
                Travel Map
              </div>
            </NuxtLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem
              v-for="{ label, href, iconName } in navItems"
              :key="label"
            >
              <SidebarMenuButton as-child :tooltip="label">
                <NuxtLink :to="href">
                  <Icon :name="iconName" size="16" class="shrink-0" />
                  <span>{{ label }}</span>
                </NuxtLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      <AppSidebarUser />
    </SidebarFooter>
  </Sidebar>
</template>
