import { useEditor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import Typography from '@tiptap/extension-typography'

const editorExtensions = [
  StarterKit,
  Placeholder.configure({ placeholder: 'Start writing...' }),
  TaskList,
  TaskItem.configure({ nested: true }),
  Typography,
]

export function useNoteEditor(update: (json: object) => void) {
  return useEditor({
    content: '',
    extensions: editorExtensions,
    editorProps: { attributes: { class: 'text-content' } },
    onUpdate: ({ editor }) => update(editor.getJSON()),
  })
}