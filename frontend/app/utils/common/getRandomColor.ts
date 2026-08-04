const colors = [
  '#FF6B6B',
  '#4ECDC4',
  '#45B7D1',
  '#96CEB4',
  '#FFEAA7',
]

export const randomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)]
}
