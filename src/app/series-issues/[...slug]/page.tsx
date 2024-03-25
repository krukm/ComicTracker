import Link from 'next/link'
import Image from 'next/image'
import { toUSDate } from '@/utils/dates'
import { getPaginatedSeriesIssueList } from '@/api/requests/series-requests'
import { PaginatedIssueList } from '@/types/issue/paginated-issue-list'
import { paginationPageNumber } from '@/utils/regex'

export default async function SeriesIssues({
  params,
}: {
  params: { slug: string[] }
}) {
  const issueList: PaginatedIssueList = await getPaginatedSeriesIssueList(
    params.slug[0],
    params.slug[1],
  )
  // const seriesId = paginationId(params.params)

  return (
    <div className="issue-image-list">
      {issueList.previous ? (
        <Link
          href={`/series-issues/${params.slug[0]}/${paginationPageNumber(
            issueList.previous,
          )}`}
          className="list-item justify-center max-h-8 self-center mx-5"
        >
          Previous issues
        </Link>
      ) : (
        <></>
      )}
      {issueList.results.map((issue) => {
        return (
          <div className="justify-self-center p-4" key={issue.id}>
            <Link href={`/issue/${issue.id}`}>
              <Image
                className="image-issue"
                src={issue.image ? issue.image : ''}
                alt={
                  issue.image
                    ? `image of ${issue.series.name} number ${issue.number}`
                    : ''
                }
                height={500}
                width={300}
              />
            </Link>
            <div className="text-center">
              #{issue.number}: {toUSDate(issue.cover_date)}
            </div>
            <Link
              className="list-item"
              href={`/api/add-collection?issue_id=${issue.id}&issue_number=${
                issue.number
              }&issue_name=${issue.issue.replace('#', '%23')}&cover_date=${
                issue.cover_date
              }&series_name=${issue.series.name}&series_id=${params.slug[0]}`}
            >
              <div className="sm-button-text">add</div>
              <div className="lg-button-text">add to collection</div>
            </Link>
          </div>
        )
      })}
      {issueList.next ? (
        <Link
          href={`/series-issues/${params.slug[0]}/${paginationPageNumber(
            issueList.next,
          )}`}
          className="list-item justify-center max-h-8 self-center"
        >
          More issues
        </Link>
      ) : (
        <></>
      )}
    </div>
  )
}
