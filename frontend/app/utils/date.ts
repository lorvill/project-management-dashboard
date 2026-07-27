export const toDateInputValue = (value?: string | null) => (value ? value.slice(0, 10) : '')

export const formatDueDate = (value?: string | null) => {
  if (!value) return ''

  const date = new Date(`${toDateInputValue(value)}T00:00:00`)

  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}
