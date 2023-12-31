import { SeriesDataWrapper } from '@/types/series'
import Link from 'next/link'

async function getSeries(name: string) {
  // Create a base64-encoded credentials string
  const base64Credentials = btoa(
    `${process.env.METRON_USERNAME}:${process.env.METRON_PASSWORD}`,
  )

  // Fetch data with Basic Authentication
  const res = await fetch(
    `${process.env.METRON_API_BASE_URL}/series/?name=${name}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${base64Credentials}`,
      },
    },
  )

  if (!res.ok) {
    throw new Error('Something went wrong')
  }

  return res.json()
}

export default async function Page({ params }: { params: { name: string } }) {
  const series: SeriesDataWrapper = await getSeries(params.name)
  const formattedName = params.name
    .replace('%20', ' ')
    .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase())

  return (
    <div>
      <div className="py-5 text-center text-5xl">
        {series.results.length} series found for {formattedName}
      </div>
      <div className="grid grid-rows-auto">
        {series.results
          .sort((a, b) => {
            return (+a.year_began || 0) - (+b.year_began || 0) || 0
          })
          .map((series, i) => {
            return (
              <Link
                className="py-2 pl-8"
                key={i}
                href={`/series-issues/${series.id}`}
              >
                <div className="text-2xl">
                  {series.series
                    .split(/(?=\()/g)
                    .sort()
                    .join(' - ')}
                </div>
                <div className="pl-4">{series.issue_count} issues</div>
              </Link>
            )
          })}
      </div>
    </div>
  )
}
