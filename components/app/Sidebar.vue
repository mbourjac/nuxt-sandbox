<script setup lang="ts">
import type { SidebarProps } from '@/components/ui/sidebar';

const props = withDefaults(defineProps<SidebarProps>(), {
  variant: 'inset',
  collapsible: 'icon',
});
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
    <SidebarContent></SidebarContent>
    <SidebarFooter>
      <AppSidebarUser />
    </SidebarFooter>
  </Sidebar>
</template>
