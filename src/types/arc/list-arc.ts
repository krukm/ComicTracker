import { SeriesVolume } from '../sub-types/series-vol'

export interface ListArc {
  id: number
  series: SeriesVolume
  number: string
  issue: string
  cover_date: string
  image?: string
  cover_hash?: string
  modified: string
}

export interface ListArcDataWrapper {
  results: ListArc[]
}
