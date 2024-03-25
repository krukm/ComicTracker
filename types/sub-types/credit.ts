import { Item } from './item'

export interface Credit {
  id: number
  creator: string
  role: Item[]
}
