import { Credit } from './credit'
import { Item } from './sub-types/item'
import { ModItem } from './sub-types/modified-item'
import { Reprint } from './sub-types/reprint'
import { Variant } from './sub-types/variant'

export interface Issue {
  id: number
  publisher: {
    id: number
    name: string
  }
  series: {
    id: number
    name: string
    sort_name: string
    volume: number
    series_type: {
      id: number
      name: string
    }
    genres: Item[]
  }
  number: string
  title?: string
  name?: string[]
  cover_date: string
  store_date?: string
  price?: string
  rating: {
    id: number
    name: string
  }
  sku?: string
  isbn?: string
  upc?: string
  page?: number
  desc?: string
  image?: string
  cover_hash?: string
  arcs: ModItem[]
  credits: Credit[]
  characters: ModItem[]
  teams: ModItem[]
  reprints: Reprint[]
  variants: Variant[]
  cv_id?: number
  resource_url: string
  modified: string
}

export interface IssueDataWrapper {
  results: Issue[]
}
