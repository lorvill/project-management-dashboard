import { randomColor } from '@/utils/common/getRandomColor'

export const useRandomColor = () => {
  return useState('color', randomColor)
}