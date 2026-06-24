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

// export function getRandomColor() {
//   return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')
// }