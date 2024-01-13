import { SeriesVolume } from '../sub-types/series-vol'

export interface ListIssue {
  id: number
  series: SeriesVolume
  number: string
  cover_date: string
  image?: string
  cover_hash?: string
  modified: string
}

export interface ListIssueDataWrapper {
  results: ListIssue[]
}
