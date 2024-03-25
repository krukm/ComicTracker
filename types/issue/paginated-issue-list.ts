import { SeriesIssue } from '../series/series-issue'

export interface PaginatedIssueList {
  count: number
  next: string
  previous: string
  results: SeriesIssue[]
}
