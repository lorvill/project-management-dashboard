<script setup lang="ts">
import { EditorContent } from '@tiptap/vue-3'
import NotesToolbarEditor from './detail/NotesToolbarEditor.vue'
import {useDebounceFn, useEventListener} from "@vueuse/core";
import {useNoteEditor} from "~/composables/useNoteEditor";
import {useCurrentNotesQuery} from "~/queries/notes/queries/current-note.query";
import {useUpdateNoteMutation} from "~/queries/notes/mutations/update-note.mutation";

const route = useRoute()
const noteId = computed(() => String(route.params.id ?? ''))
const { data: currentNote } = useCurrentNotesQuery(noteId)
const { mutate } = useUpdateNoteMutation()
const title = ref('')
const save = (content: object) => mutate({
  id: noteId.value,
  title: title.value,
  content })

const editor = useNoteEditor(useDebounceFn(save, 250))

watch([currentNote, editor], ([note, editorInstance]) => {
  if (!note || !editorInstance) return

  title.value = note.title ?? ''

  const incoming = note.content ?? null
  const current = editorInstance.getJSON()

  if (JSON.stringify(incoming) !== JSON.stringify(current)) {
    editorInstance.commands.setContent(incoming)
  }
}, { immediate: true })

useEventListener('beforeunload', () => {
  if (editor.value) save(editor.value.getJSON())
})
</script>

<template>
  <div class="text-editor">
    <input
        v-model="title"
        class="note-title"
        type="text"
        placeholder="Untitled"
        aria-label="Note title"
    />

    <NotesToolbarEditor v-if="editor" :editor="editor" />
    <EditorContent :editor="editor" />
  </div>
</template>

<style>
.text-editor {
  width: 100%;
  min-height: calc(100vh - 48px);
  padding: 72px 96px;
}

.note-title {
  display: block;
  width: 100%;
  max-width: 760px;
  margin-bottom: 18px;
  border: none;
  outline: none;
  background: transparent;
  font-size: 2.35rem;
  font-weight: 800;
  line-height: 1.15;
  color: #0f172a;
}

.note-title::placeholder {
  color: #cbd5e1;
}

.text-content {
  width: 100%;
  max-width: 760px;
  min-height: 70vh;
  outline: none;
  font-size: 16px;
  line-height: 1.7;
  color: #37352f;
  caret-color: #37352f;
}

.text-content p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: #9b9a97;
  pointer-events: none;
  height: 0;
}

.text-content p {
  margin: 0.35rem 0;
}

.text-content h1 {
  margin: 1.4rem 0 0.6rem;
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.25;
}

.text-content h2 {
  margin: 1.2rem 0 0.5rem;
  font-size: 1.55rem;
  font-weight: 650;
  line-height: 1.3;
}

.text-content h3 {
  margin: 1rem 0 0.4rem;
  font-size: 1.25rem;
  font-weight: 650;
  line-height: 1.35;
}

.text-content ul,
.text-content ol {
  margin: 0.4rem 0;
  padding-left: 1.5rem;
}

.text-content li {
  margin: 0.2rem 0;
}

.text-content ul[data-type='taskList'] {
  padding-left: 0;
  list-style: none;
}

.text-content ul[data-type='taskList'] li {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
}

.text-content ul[data-type='taskList'] li > label {
  margin-top: 0.25rem;
}

.text-content ul[data-type='taskList'] li > div {
  flex: 1;
}

.text-content
ul[data-type='taskList']
input[type='checkbox'] {
  width: 16px;
  height: 16px;
  cursor: pointer;
  accent-color: #37352f;
}

.text-content code {
  padding: 0.15rem 0.35rem;
  border-radius: 4px;
  background: #f1f1ef;
  color: #eb5757;
  font-size: 0.9em;
}

.text-content pre {
  margin: 1rem 0;
  padding: 1rem;
  overflow-x: auto;
  border-radius: 8px;
  background: #f7f6f3;
  color: #37352f;
}

.text-content pre code {
  padding: 0;
  background: transparent;
  color: inherit;
}

.text-content blockquote {
  margin: 1rem 0;
  padding-left: 1rem;
  border-left: 3px solid #37352f;
  color: #55534f;
}

.text-content hr {
  margin: 2rem 0;
  border: none;
  border-top: 1px solid #e9e9e7;
}

.text-content a {
  color: #3b82f6;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.text-content ::selection {
  background: #d9e8ff;
}
</style>
