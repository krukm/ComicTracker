import { toYearOnly } from '@/utils/dates'
import Link from 'next/link'
import { PaginatedIssueList } from '@/types/issue/paginated-issue-list'
import { paginationPageNumber, paginationId } from '@/utils/regex'
import { getPaginatedCharacterIssueList } from '@/app/api/requests/character-requests'

/**
 * Function to produce the IssueList component.
 * @returns The IssueList component.
 */
export default async function Page({ params }: { params: { params: string } }) {
  console.log('page params: ', params.params)
  const issueList: PaginatedIssueList = await getPaginatedCharacterIssueList(
    params.params,
  )

  return (
    <div className="issue-list-container">
      <div className="issue-list">
        {issueList.previous ? (
          <Link
            href={`/issue-list/${paginationId(
              params.params,
            )}page${paginationPageNumber(issueList.previous)}`}
            className="list-item justify-center"
          >
            Previous issues
          </Link>
        ) : (
          <></>
        )}
        {issueList.results.map((issue, index) => {
          return (
            <Link key={index} href={`/issue/${issue.id}`} className="list-item">
              <div className="basis-6/12 grow">
                {issue.series.name} #{issue.number}
              </div>
              <div className="basis-2/12">Vol {issue.series.volume}</div>
              <div className="basis-1/12">({toYearOnly(issue.cover_date)})</div>
            </Link>
          )
        })}
        {issueList.next ? (
          <Link
            href={`/issue-list/${
              paginationId(
                params.params,
              )}page${paginationPageNumber(issueList.next)
            }`}
            className="list-item justify-center"
          >
            More issues
          </Link>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}
