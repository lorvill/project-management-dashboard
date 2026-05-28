<script setup lang="ts">
import { ref } from 'vue'
import {
  Briefcase,
  LayoutGrid,
  PlusCircle,
  Hash,
  Settings,
  ChevronDown,
  ChevronUp,
  NotebookIcon,
  ListIcon,
  TrashIcon, ZapIcon, SearchIcon, HomeIcon, PenLine
} from 'lucide-vue-next'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from '@/components/ui/sidebar'

type MenuPosition = 'top' | 'content' | 'bottom'

interface MenuItem {
  title: string
  icon: unknown
  addNew?: boolean
  to?: Record<string, unknown>
}

interface MenuSection {
  id: string
  position: MenuPosition
  label?: string
  items: MenuItem[]
  fetchedItems?: MenuItem[]
}

const menuSections: MenuSection[] = [
  {
    id: 'main',
    position: 'top',
    label: 'MAIN',
    items: [
      { title: 'Search', icon: SearchIcon },
      { title: 'Dashboard', icon: LayoutGrid, to: { name: 'dashboard' } },
      { title: 'Notes', icon: NotebookIcon, to: { name: 'notes' } },
      { title: 'Task List', icon: ListIcon },
    ]
  },
  {
    id: 'workspaces',
    position: 'content',
    label: 'WORKSPACES',
    items: [
      { title: 'All Projects', icon: ZapIcon, addNew: true },
      { title: 'Add New Project', icon: PlusCircle, addNew: true },
      { title: 'Product Squad', icon: PenLine },
    ]
  },
  {
    id: 'other',
    position: 'bottom',
    label: 'OTHER',
    items: [
      { title: 'Trash', icon: TrashIcon },
      { title: 'Settings', icon: Settings },
    ]
  },
]

const getSectionsByPosition = (position: MenuPosition) =>
    menuSections.filter(s => s.position === position)

const expandedSections = ref<Record<string, boolean>>({})
const toggleSection = (id: string) => {
  expandedSections.value[id] = !expandedSections.value[id]
}

const getVisibleItems = (section: MenuSection) =>
    expandedSections.value[section.id]
        ? section.items
        : section.items.slice(0, 4)
</script>

<template>
  <Sidebar collapsible="icon" variant="inset">
    <template v-for="section in getSectionsByPosition('top')" :key="section.id">
      <SidebarGroup class="border-b border-slate-300/60 pb-4 px-3">
        <SidebarGroupLabel
            v-if="section.label"
            class="py-2 text-[12px] font-extrabold tracking-widest text-black uppercase"
        >
          {{ section.label }}
        </SidebarGroupLabel>

        <SidebarMenu>
          <SidebarMenuItem v-for="item in section.items" :key="item.title">
            <SidebarMenuButton
                class="h-9 rounded-2xl transition-all duration-200 cursor-pointer text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950 "
                as-child
            >
              <NuxtLink :to="item.to">
                <component :is="item.icon" class="w-4 h-4" />
                <span class="text-sm ml-0.5">{{ item.title }}</span>
              </NuxtLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </template>

    <SidebarContent class="overflow-x-hidden overflow-y-auto custom-scrollbar flex-1 px-1">
      <template v-for="section in getSectionsByPosition('content')" :key="section.id">
        <SidebarGroup class="pb-0">
          <SidebarGroupLabel
              v-if="section.label"
              class="py-2 text-[11px] font-extrabold tracking-widest text-black uppercase"
          >
            {{ section.label }}
          </SidebarGroupLabel>

          <SidebarMenu>
            <SidebarMenuItem v-for="item in getVisibleItems(section)" :key="item.title">
              <SidebarMenuButton
                  class="h-9 rounded-2xl transition-all duration-200 cursor-pointer group"
                  :class="item.addNew
                  ? 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950'
                  : 'text-neutral-400 hover:bg-neutral-50 hover:text-neutral-600'"
              >
                <component :is="item.icon" class="w-4 h-4 shrink-0" />
                <span class="flex-1 text-sm truncate ml-0.5">{{ item.title }}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem v-if="section.items.length > 4">
              <SidebarMenuButton
                  @click="toggleSection(section.id)"
                  class="h-9 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <component
                    :is="expandedSections[section.id] ? ChevronUp : ChevronDown"
                    class="w-4 h-4 shrink-0"
                />
                <span class="text-sm ml-2">
                  {{ expandedSections[section.id] ? 'Less' : 'More...' }}
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </template>
    </SidebarContent>

    <template v-for="section in getSectionsByPosition('bottom')" :key="section.id">
      <SidebarGroup class="border-t border-slate-300/60 pt-2 pb-5">
        <SidebarGroupLabel
            v-if="section.label"
            class="px-4 py-2 text-[12px] font-bold tracking-widest text-black uppercase"
        >
          {{ section.label }}
        </SidebarGroupLabel>

        <SidebarMenu>
          <SidebarMenuItem v-for="item in section.items" :key="item.title">
            <SidebarMenuButton
                class="h-9 px-4 rounded-2xl text-neutral-600 transition-all duration-200 cursor-pointer hover:bg-neutral-100 hover:text-neutral-950"
            >
              <component :is="item.icon" class="w-4 h-4 shrink-0" />
              <span class="flex-1 text-sm truncate ml-0.5">{{ item.title }}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>

<!--      <Button-->
<!--          variant="ghost"-->
<!--          class="mb-6 w-fit mx-auto px-15 rounded-2xl h-10 group cursor-pointer text-neutral-200 bg-blue-950 hover:bg-indigo-100 hover:text-indigo-900 transition-colors duration-200"-->
<!--      >-->
<!--        <div class="flex items-center">-->
<!--          <span class="text-[14px] font-semibold leading-none">Add new project</span>-->
<!--        </div>-->
<!--      </Button>-->
    </template>
  </Sidebar>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: transparent;
  border-radius: 10px;
}
.custom-scrollbar:hover::-webkit-scrollbar-thumb {
  background: #d1d5db;
}
</style>