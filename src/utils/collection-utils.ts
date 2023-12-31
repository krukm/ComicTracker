import { SeriesIssue } from '@/types/series-issue'

export const addSeriesToCollection = (series: SeriesIssue): SeriesIssue[] => {
  const collection: SeriesIssue[] = []
  collection.push(series)
  return collection
}
