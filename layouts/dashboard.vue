<script lang="ts" setup>
const defaultOpen = useCookie<boolean>('sidebar:state');
</script>

<template>
  <SidebarProvider :default-open="defaultOpen">
    <AppSidebar />
    <SidebarInset>
      <header class="flex h-16 shrink-0 items-center gap-2">
        <div class="flex items-center gap-2 px-4">
          <SidebarTrigger class="-ml-1 cursor-pointer" />
          <Separator
            orientation="vertical"
            class="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <main class="flex flex-1">
        <slot />
      </main>
    </SidebarInset>
  </SidebarProvider>
</template>
