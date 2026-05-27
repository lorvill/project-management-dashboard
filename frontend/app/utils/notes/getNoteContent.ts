import type {JSONContent} from "@tiptap/vue-3";

export const getNoteContent = (content?: JSONContent | null): string => {
  if (!content) return ''

  const ownText = typeof content.text === 'string' ? content.text : ''
  const childText = content.content?.map(getNoteContent).filter(Boolean).join(' ') ?? ''

  return [ownText, childText].filter(Boolean).join(' ').trim()
}