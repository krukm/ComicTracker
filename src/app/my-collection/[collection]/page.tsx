import { SeriesIssue } from '@/types/series-issue'

export default function Page({
  params,
}: {
  params: { collection: SeriesIssue[] }
}) {
  return (
    <div>
      {params.collection.sort().map((series, index) => {
        return (
          <div key={index}>
            <div>{series.series.name}</div>
            <div>
              <label>{series.issue}</label>
              <input
                type="checkbox"
                className="appearance-none checked:text-red-600 checked:border-transparent"
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
