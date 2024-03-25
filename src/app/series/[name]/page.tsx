import { getSeries } from '@/api/requests/series-requests'
import { SeriesDataWrapper } from '@/types/series/series'
import { dateFirst, formattedName } from '@/utils/regex'
import Link from 'next/link'

export default async function Series({ params }: { params: { name: string } }) {
  const series: SeriesDataWrapper = await getSeries(params.name)

  return (
    <div>
      <div className="page-subheader">
        {series.results.length} series found for {formattedName(params.name)}
      </div>
      <div className="flex flex-col">
        {series.results
          .sort((a, b) => {
            return (+a.year_began || 0) - (+b.year_began || 0) || 0
          })
          .map((series, i) => {
            return (
              <Link
                className="comic-box"
                key={i}
                href={`/series-issues/${series.id}/${1}`}
              >
                <div className="text-2xl">{dateFirst(series.series)}</div>
                <div className="pl-4">{series.issue_count} issues</div>
              </Link>
            )
          })}
      </div>
    </div>
  )
}
