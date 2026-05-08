<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from "@/lib/utils"
import { Button } from '@/components/ui/button'
import { useSidebar } from "./utils"
import { Menu } from "lucide-vue-next";

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()

const { toggleSidebar } = useSidebar()
</script>

<template>
  <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      :class="cn('w-1', props.class)"
      @click="toggleSidebar"
  >
    <Menu class="size-4" />
  </Button>
</template>
