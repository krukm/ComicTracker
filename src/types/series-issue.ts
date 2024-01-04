export interface SeriesIssue {
  id: number
  series: {
    name: string
    volume: number
    year_began: number
  }
  number: string
  issue: string
  cover_date: string
  image: string
  cover_hash: string
  modified: string
}

export interface SeriesIssueDataWrapper {
  results: SeriesIssue[]
}
