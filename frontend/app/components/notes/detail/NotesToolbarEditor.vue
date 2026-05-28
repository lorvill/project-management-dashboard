<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3'
import { BubbleMenu, FloatingMenu } from '@tiptap/vue-3/menus'
import {
  Bold,
  Code2,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  List,
  ListOrdered,
  ListTodo,
  Pilcrow,
  Quote,
  Underline as UnderlineIcon,
} from 'lucide-vue-next'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const props = defineProps<{
  editor: Editor
}>()

const isBlockMenuOpen = ref(false)

const closeBlockMenu = () => {
  isBlockMenuOpen.value = false
}

// const shouldShowBubbleMenu = ({editor, state}: {
//   editor: Editor
//   state: any
// }) => {
//   return editor.isEditable && !state.selection.empty
// }
//
// const shouldShowBlockMenu = ({editor, state}: {
//   editor: Editor
//   state: any
// }) => {
//   const { selection } = state
//   const parent = selection.$from.parent
//   const show = editor.isEditable && selection.empty && parent.isTextblock && parent.textContent.length === 0
//
//   if (!show) isBlockMenuOpen.value = false
//   return show
// }

const inlineActions = [
  {
    label: 'Bold',
    icon: Bold,
    isActive: () => props.editor.isActive('bold'),
    run: () => props.editor.chain().focus().toggleBold().run(),
  },
  {
    label: 'Italic',
    icon: Italic,
    isActive: () => props.editor.isActive('italic'),
    run: () => props.editor.chain().focus().toggleItalic().run(),
  },
  {
    label: 'Underline',
    icon: UnderlineIcon,
    isActive: () => props.editor.isActive('underline'),
    run: () => props.editor.chain().focus().toggleUnderline().run(),
  },
  {
    label: 'Code',
    icon: Code2,
    isActive: () => props.editor.isActive('code'),
    run: () => props.editor.chain().focus().toggleCode().run(),
  },
]

const blockActions = [
  {
    label: 'Text',
    description: 'Plain paragraph',
    icon: Pilcrow,
    isActive: () => props.editor.isActive('paragraph'),
    run: () => props.editor.chain().focus().setParagraph().run(),
  },
  {
    label: 'Heading 1',
    description: 'Large section title',
    icon: Heading1,
    isActive: () => props.editor.isActive('heading', { level: 1 }),
    run: () => props.editor.chain().focus().toggleHeading({ level: 1 }).run(),
  },
  {
    label: 'Heading 2',
    description: 'Medium section title',
    icon: Heading2,
    isActive: () => props.editor.isActive('heading', { level: 2 }),
    run: () => props.editor.chain().focus().toggleHeading({ level: 2 }).run(),
  },
  {
    label: 'Heading 3',
    description: 'Small section title',
    icon: Heading3,
    isActive: () => props.editor.isActive('heading', { level: 3 }),
    run: () => props.editor.chain().focus().toggleHeading({ level: 3 }).run(),
  },
  {
    label: 'Bullet list',
    description: 'Simple unordered list',
    icon: List,
    isActive: () => props.editor.isActive('bulletList'),
    run: () => props.editor.chain().focus().toggleBulletList().run(),
  },
  {
    label: 'Numbered list',
    description: 'Ordered steps',
    icon: ListOrdered,
    isActive: () => props.editor.isActive('orderedList'),
    run: () => props.editor.chain().focus().toggleOrderedList().run(),
  },
  {
    label: 'Task list',
    description: 'Checkboxes for todos',
    icon: ListTodo,
    isActive: () => props.editor.isActive('taskList'),
    run: () => props.editor.chain().focus().toggleTaskList().run(),
  },
  {
    label: 'Quote',
    description: 'Callout text',
    icon: Quote,
    isActive: () => props.editor.isActive('blockquote'),
    run: () => props.editor.chain().focus().toggleBlockquote().run(),
  },
  {
    label: 'Code block',
    description: 'Multiline code',
    icon: Code2,
    isActive: () => props.editor.isActive('codeBlock'),
    run: () => props.editor.chain().focus().toggleCodeBlock().run(),
  },
]

const runBlockAction = (run: () => boolean) => {
  run()
  closeBlockMenu()
}
</script>
<template>
  <BubbleMenu
      :editor="editor"
      :options="{
      placement: 'top',
      offset: 10,
      strategy: 'fixed',
    }"
      :update-delay="0"
  >
    <div class="editor-bubble-menu">
      <button
          v-for="action in inlineActions"
          :key="action.label"
          :class="{ active: action.isActive() }"
          :aria-label="action.label"
          :title="action.label"
          type="button"
          @click="action.run"
      >
        <component :is="action.icon" class="size-4" />
      </button>
    </div>
  </BubbleMenu>

  <FloatingMenu
      :editor="editor"
      :options="{
      placement: 'left-start',
      offset: 12,
      strategy: 'fixed',
    }"
      :update-delay="0"
  >
    <DropdownMenu v-model:open="isBlockMenuOpen">
      <DropdownMenuTrigger as-child>
        <button
            class="block-menu-dot"
            type="button"
            aria-label="Open block menu"
            title="Block styles"
        >
          <span />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
          class="w-65 max-h-90 overflow-y-auto p-1 bg-white"
          side="right"
          align="start"
          :side-offset="8"
          :collision-padding="16"
          :avoid-collisions="true"
      >
        <DropdownMenuItem
            v-for="action in blockActions"
            :key="action.label"
            :class="[
            'group flex cursor-pointer items-center gap-3 rounded-md p-2 outline-none transition-colors',
            'hover:bg-orange-50 hover:text-orange-600',
            'focus:bg-orange-50 focus:text-orange-600',
            'data-highlighted:bg-orange-50 data-highlighted:text-orange-600',
            action.isActive() && 'bg-orange-50 text-orange-600',
          ]"
            @select.prevent="runBlockAction(action.run)"
        >
          <span
              :class="[
              'flex size-8 shrink-0 items-center justify-center rounded-md bg-slate-50 text-slate-500 transition-colors',
              'group-hover:bg-orange-100 group-hover:text-orange-600',
              'group-data-highlighted:bg-orange-100 group-data-highlighted:text-orange-600',
              action.isActive() && 'bg-orange-100 text-orange-600',
            ]"
          >
            <component :is="action.icon" class="size-4" />
          </span>

          <span class="flex min-w-0 flex-col">
            <span class="text-sm font-bold leading-tight">
              {{ action.label }}
            </span>

            <span
                class="mt-0.5 text-xs font-medium leading-tight text-slate-400 transition-colors group-hover:text-orange-400 group-data-[highlighted]:text-orange-400"
            >
              {{ action.description }}
            </span>
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </FloatingMenu>
</template>

<style scoped>
.editor-bubble-menu {
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 4px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.12), 0 1px 2px rgba(15, 23, 42, 0.08);
  backdrop-filter: blur(10px);
}

.editor-bubble-menu button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: #475569;
  cursor: pointer;
}

.editor-bubble-menu button:hover,
.editor-bubble-menu button.active {
  background: #fff7ed;
  color: #ea580c;
}

.block-menu-dot {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border: 1px solid transparent;
  border-radius: 6px;
  background: transparent;
  cursor: pointer;
}

.block-menu-dot:hover,
.block-menu-dot:focus-visible {
  border-color: #fed7aa;
  background: #fff7ed;
}

.block-menu-dot span {
  width: 5px;
  height: 5px;
  border-radius: 999px;
  background: #94a3b8;
}

.block-menu-dot:hover span,
.block-menu-dot:focus-visible span {
  background: #ea580c;
}
</style>