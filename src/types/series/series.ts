export interface Series {
  id: number
  series: string
  year_began: number
  issue_count: number
  modified: string
}

export interface SeriesDataWrapper {
  results: Series[]
}
