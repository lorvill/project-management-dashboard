<template>
  <div class="h-dvh bg-linear-to-br from-gray-100 via-gray-400 to-[#cfdaec] flex items-center justify-center md:p-4 ">
    <SidebarProvider class="flex flex-col w-full h-full md:h-[95vh] md:rounded-xl bg-white shadow-2xl overflow-hidden">

      <header class="w-full h-14 shrink-0 border-b border-slate-200  backdrop-blur-md px-4 flex items-center justify-between z-10">
        <div class="flex items-center gap-5.5">
          <SidebarTrigger class="text-indigo-900 group-hover:text-indigo-500 transition-colors" />
          <div class="h-6 w-[1px] bg-slate-200" />
          <span class="font-black text-blue-900 tracking-tight text-xl">DASHBY</span>
        </div>

        <div class="flex items-center gap-4">
          <AppDropdown />
        </div>
      </header>

      <div class="flex flex-1 min-h-0 w-full">
        <SidebarAppSidebar />

        <main class="flex-1 min-w-0 overflow-y-auto p-6 bg-neutral-50">
          <slot />
        </main>
      </div>
    </SidebarProvider>
  </div>
</template>
