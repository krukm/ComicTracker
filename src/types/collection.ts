export interface CollectionItem {
  issue_id: number
  issue_number: number
  issue_name: string
  cover_date: string
  series_name: string
}

export interface Collection {
  collection: CollectionItem[]
}
