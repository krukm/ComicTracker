import { getTeamInfo, getTeamIssues } from '../../api/requests/team-requests'
import { ListIssueDataWrapper } from '../../../../types/issue/list-issue'
import { TeamInfo } from '../../../../types/team/team-info'
import { toUSDate } from '../../../../utils/dates'
import Image from 'next/image'
import Link from 'next/link'

export default async function Team({ params }: { params: { id: number } }) {
  const teamInfo: TeamInfo = await getTeamInfo(params.id)
  const teamIssues: ListIssueDataWrapper = await getTeamIssues(params.id)

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
          <div className="page-subheading">Appearing in these issues:</div>
          <div className="issue-list">
            {teamIssues.results.map((issue, index) => {
              return (
                <Link
                  href={`/issue/${issue.id}`}
                  key={index}
                  className="list-item"
                >
                  {issue.series.name} Vol {issue.series.volume} #{issue.number}{' '}
                  ({toUSDate(issue.cover_date)})
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
