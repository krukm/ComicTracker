interface Item {
  id: number
  name: string
}

interface ModItem {
  id: number
  name: string
  modified: string
}

interface Credit {
  id: number
  creator: string
  role: Item[]
}

interface Reprint {
  id: number
  issue: string
}

interface Variant {
  name?: string
  sku?: string
  upc?: string
  image: string
}

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
