<script setup lang="ts">
import { nextTick, ref } from 'vue'

defineOptions({ inheritAttrs: false })

const model = defineModel<string>({ default: '' })
const props = withDefaults(defineProps<{
  placeholder?: string
  emptyText?: string
  allowEmpty?: boolean
  displayClass?: string
}>(), {
  placeholder: '',
  emptyText: '',
  allowEmpty: true,
  displayClass: '',
})

const isEditing = ref(false)
const draft = ref('')
const inputRef = useTemplateRef('input-ref')

const startEditing = async () => {
  draft.value = model.value ?? ''
  isEditing.value = true

  await nextTick()
  inputRef.value?.focus()
}

const cancelEditing = () => {
  isEditing.value = false
}

const save = () => {
  if (!isEditing.value) return

  const value = draft.value.trim()

  if (!value && !props.allowEmpty) {
    cancelEditing()
    return
  }

  if (value !== (model.value ?? '')) {
    model.value = value
  }

  isEditing.value = false
}
</script>

<template>
  <div
      class="h-9 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500"
      @click="startEditing"
  >
    <input
        v-if="isEditing"
        ref="input-ref"
        v-model="draft"
        v-bind="$attrs"
        type="text"
        class="h-9 w-full bg-white px-3 text-sm outline-none"
        :placeholder="placeholder"
        @click.stop
        @keydown.enter.prevent="save"
        @keydown.esc.prevent="cancelEditing"
        @blur="save"
    >
    <div
        v-else
        class="flex h-full items-center px-3"
        :class="displayClass"
    >
      <div class="min-w-0 truncate">
        <slot v-if="model" />
        <span v-else class="text-zinc-400">{{ emptyText }}</span>
      </div>
    </div>
  </div>
</template>
