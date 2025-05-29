<script setup lang="ts">
import { useSidebar } from '../ui/sidebar';

const authStore = useAuthStore();
const { isMobile } = useSidebar();
</script>

<template>
  <SidebarMenu>
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <SidebarMenuButton
            size="lg"
            class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground flex cursor-pointer justify-between gap-2"
          >
            <div class="flex gap-2">
              <AppAvatar />
              <AppUserInfo />
            </div>
            <Icon name="tabler:selector" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          class="w-[--reka-dropdown-menu-trigger-width] min-w-56 rounded-lg"
          :side="isMobile ? 'bottom' : 'right'"
          align="end"
          :side-offset="4"
        >
          <DropdownMenuLabel class="p-0 font-normal">
            <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <AppUserInfo />
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <!-- TODO: add theme toggle -->
          <DropdownMenuItem
            class="flex cursor-pointer justify-between"
            @click="authStore.signOut"
          >
            <span>Sign out</span>
            <Icon name="tabler:logout-2" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  </SidebarMenu>
</template>
