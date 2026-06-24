export const formatDate = (
  date: string,
  options?: Intl.DateTimeFormatOptions
) =>
  new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    ...options,
  }).format(new Date(date))