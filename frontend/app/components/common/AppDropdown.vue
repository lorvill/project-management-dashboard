<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {LogOut, Settings, User} from "lucide-vue-next";
import {useLogoutMutation} from "../../queries/auth/mutations/logout.mutation";
const userColor = ref('#4F46E5');

const logoutMutation = useLogoutMutation();
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <section class="flex items-center gap-3 bg-zinc-100 py-1 px-3 rounded-full hover:bg-zinc-200 cursor-pointer">
        <div
            class="w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-white text-[10px] font-bold"
            :style="{ backgroundColor: userColor }"
        > U
        </div>
        <span class="text-xs font-medium text-slate-700">lorville</span>
      </section>
    </DropdownMenuTrigger>

    <DropdownMenuContent
        align="end"
        :side-offset="8"
        class="w-48 bg-white/80 backdrop-blur-md border border-slate-200 p-1.5 shadow-xl rounded-2xl ring-1 ring-black/5 "
    >
      <DropdownMenuItem
          class="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 outline-none transition-all duration-200 rounded-lg cursor-pointer hover:bg-amber-50 hover:text-amber-600 group"
      >
        <component :is="User" class="w-4 h-4 text-slate-400 group-hover:text-amber-500 transition-colors" />
        <span class="font-medium">My Account</span>
      </DropdownMenuItem>

      <DropdownMenuItem
          class="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 outline-none transition-all duration-200 rounded-lg cursor-pointer hover:bg-amber-50 hover:text-amber-600 group"
      >
        <component :is="Settings" class="w-4 h-4 text-slate-400 group-hover:text-amber-500 transition-colors" />
        <span class="font-medium">Settings</span>
      </DropdownMenuItem>

      <DropdownMenuSeparator class="my-1 h-px bg-slate-100" />

      <DropdownMenuItem
          class="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 outline-none transition-all duration-200 rounded-lg cursor-pointer hover:bg-red-50 hover:text-red-600 group"
      >
        <component :is="LogOut" class="w-4 h-4 text-slate-400 group-hover:text-red-500 transition-colors" />
        <span @click="logoutMutation.mutate()" class="font-medium">Log Out</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
