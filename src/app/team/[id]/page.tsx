import { getTeamInfo } from '../../api/requests/team-requests'
import { TeamInfo } from '../../../../types/team/team-info'
import { toUSDate, toYearOnly } from '../../../../utils/dates'
import Image from 'next/image'
import Link from 'next/link'
import { getPaginatedIssueList } from '@/app/api/requests/pagination-requests'
import { PaginatedIssueList } from '../../../../types/issue/paginated-issue-list'
import { paginationPageNumber } from '../../../../utils/regex'

export default async function Team({ params }: { params: { id: number } }) {
  const teamInfo: TeamInfo = await getTeamInfo(params.id)
  const issueList: PaginatedIssueList = await getPaginatedIssueList(
    'team',
    String(params.id),
    '1',
  )

  return (
    <div className="page">
      <div className="page-header">{teamInfo.name}</div>
      <div className="flex flex-col md:flex-row">
        <div className="image-container">
          <Image
            src={teamInfo.image ? teamInfo.image : ''}
            alt={`image of ${teamInfo.name}`}
            height={700}
            width={450}
          />
        </div>
        <div className="p-10 self-center">{teamInfo.desc}</div>
      </div>
      <div>
        <div className="issue-list-container">
          <div className="text-3xl">
            {teamInfo.name} appears in these issues:
          </div>
          <div className="issue-image-list">
            {issueList.previous ? (
              <Link
                href={`/issue-list/${'team'}/${
                  params.id
                }/${paginationPageNumber(issueList.previous)}`}
                className="list-item justify-center self-center"
              >
                More issues
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
                    #{issue.number} ({toYearOnly(issue.cover_date)})
                  </div>
                  <Link
                    className="list-item"
                    href={`/api/add-collection?issue_id=${
                      issue.id
                    }&issue_number=${
                      issue.number
                    }&issue_name=${issue.issue.replace(
                      '#',
                      '%23',
                    )}&cover_date=${issue.cover_date}&series_name=${
                      issue.series.name
                    }&series_id=${params.id}`}
                  >
                    <div className="sm-button-text">add</div>
                    <div className="lg-button-text">add to collection</div>
                  </Link>
                </div>
              )
            })}
            {issueList.next ? (
              <Link
                href={`/issue-list/${'team'}/${
                  params.id
                }/${paginationPageNumber(issueList.next)}`}
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
    </div>
  )
}
