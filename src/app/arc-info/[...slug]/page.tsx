import { getArc } from '../../api/requests/arc-requests'
import { ArcInfo } from '../../../../types/arc/arc-info'
import Image from 'next/image'
import Link from 'next/link'
import { PaginatedIssueList } from '../../../../types/issue/paginated-issue-list'
import { getPaginatedIssueList } from '@/app/api/requests/pagination-requests'
import { paginationPageNumber } from '../../../../utils/regex'
import { toYearOnly } from '../../../../utils/dates'

export default async function AcrInfo({
  params,
}: {
  params: { slug: string[] }
}) {
  const arc: ArcInfo = await getArc(params.slug[1])
  const arcIssueList: PaginatedIssueList = await getPaginatedIssueList(
    'arc',
    params.slug[1],
    params.slug[2],
  )

  return (
    <div className="page">
      <div className="page-header">{arc.name}</div>
      <div className="flex flex-col mt-6 md:flex-row">
        {arc.image ? (
          <div className="image-container justify-center">
            <Image
              className="image"
              src={arc.image ? arc.image : ''}
              alt={`image of ${arc.name} story arc`}
              width={200}
              height={200}
            />
          </div>
        ) : (
          <></>
        )}
        {arc.desc ? (
          <div className="p-4 md:p-10 md:self-center">{arc.desc}</div>
        ) : (
          <></>
        )}
      </div>
      <div className="issue-list-container">
        <div className="page-subheader">{arc.name} issues:</div>
        <div className="issue-image-list">
          {arcIssueList.previous ? (
            <Link
              href={`/issue-list/arc/${params.slug[1]}/${paginationPageNumber(
                arcIssueList.previous,
              )}`}
              className="list-item justify-center self-center"
            >
              Previous issues
            </Link>
          ) : (
            <></>
          )}
          {arcIssueList.results.map((issue) => {
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
                  #{issue.number} ({toYearOnly(issue.cover_date)})
                </div>
                <Link
                  className="list-item"
                  href={`/api/add-collection?issue_id=${
                    issue.id
                  }&issue_number=${
                    issue.number
                  }&issue_name=${issue.issue.replace('#', '%23')}&cover_date=${
                    issue.cover_date
                  }&series_name=${issue.series.name}&series_id=${
                    params.slug[1]
                  }`}
                >
                  <div className="sm-button-text">add</div>
                  <div className="lg-button-text">add to collection</div>
                </Link>
              </div>
            )
          })}
          {arcIssueList.next ? (
            <Link
              href={`/issue-list/arc/${params.slug[1]}/${paginationPageNumber(
                arcIssueList.next,
              )}`}
              className="list-item justify-center self-center"
            >
              More issues
            </Link>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  )
}
