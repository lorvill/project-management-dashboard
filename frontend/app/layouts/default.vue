<script setup lang="ts">
import AppDropdown from "~/components/common/AppDropdown.vue";
</script>

<template>
  <div class="h-dvh overflow-hidden bg-linear-to-br from-orange-50 via-orange-400/20 to-amber-900/10 p-4 grid">
    <SidebarProvider
        class="min-h-0 w-full max-w-407.5 mx-auto flex flex-col rounded-3xl bg-white shadow-2xl overflow-hidden"
    >

      <header class="w-full h-14 shrink-0 border-b border-slate-200 backdrop-blur-md px-4 flex items-center justify-between z-10">
        <div class="flex items-center gap-5">
          <SidebarTrigger class="text-amber-900 transition-colors cursor-pointer" />
          <div class="h-8 w-px p-0 bg-slate-200" />
          <span class="font-normal text-amber-900 tracking-tight text-2xl pl-1">DASHBY</span>
        </div>

        <div class="flex items-center gap-4">
          <AppDropdown />
        </div>
      </header>

      <div class="flex flex-1 min-h-0 w-full">
        <SidebarAppSidebar />

        <main class="flex-1 min-w-0 overflow-y-auto p-4 bg-neutral-50/40">
          <slot />
        </main>
      </div>
    </SidebarProvider>
  </div>
</template>
