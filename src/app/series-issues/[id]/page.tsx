import { SeriesIssueDataWrapper } from '@/types/series/series-issue'
import Link from 'next/link'
import Image from 'next/image'
import { toUSDate } from '@/utils/dates'

async function getSeriesIssues(id: number) {
  // Create a base64-encoded credentials string
  const base64Credentials = btoa(
    `${process.env.METRON_USERNAME}:${process.env.METRON_PASSWORD}`,
  )
  const url = `${process.env.METRON_API_BASE_URL}/series/${id}/issue_list/`

  // Fetch data with Basic Authentication
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${base64Credentials}`,
    },
  })

  if (!res.ok) {
    throw new Error('unable to fetch issues')
  }

  return res.json()
}

export default async function Page({ params }: { params: { id: number } }) {
  const seriesIssues: SeriesIssueDataWrapper = await getSeriesIssues(params.id)

  return (
    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {seriesIssues.results.map((issue) => {
        return (
          <div className="justify-self-center p-4" key={issue.id}>
            <Link href={`/issue/${issue.id}`}>
              <Image
                className="outline"
                src={issue.image ? issue.image : ''}
                alt={
                  issue.image
                    ? `image of ${issue.series.name} number ${issue.number}`
                    : ''
                }
                height={500}
                width={200}
              ></Image>
            </Link>
            <div className="text-center">
              #{issue.number}: {toUSDate(issue.cover_date)}
            </div>
            <Link
              className="bg-transparent text-center text-nowrap text-blue-900 font-semibold"
              href={`/api/add-collection?issue_id=${issue.id}&issue_number=${
                issue.number
              }&issue_name=${issue.issue.replace('#', '%23')}&cover_date=${
                issue.cover_date
              }&series_name=${issue.series.name}&series_id=${params.id}`}
            >
              add to collection
            </Link>
          </div>
        )
      })}
    </div>
  )
}
