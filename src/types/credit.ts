import { Item } from './sub-types/item'

export interface Credit {
  id: number
  creator: string
  role: Item[]
}
