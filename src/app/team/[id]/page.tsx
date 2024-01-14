import { ListIssueDataWrapper } from '@/types/issue/list-issue'
import { TeamInfo } from '@/types/team/team-info'
import { toUSDate } from '@/utils/dates'
import Image from 'next/image'
import Link from 'next/link'

async function getTeamInfo(id: number) {
  // Create a base64-encoded credentials string
  const base64Credentials = btoa(
    `${process.env.METRON_USERNAME}:${process.env.METRON_PASSWORD}`,
  )
  const url = `${process.env.METRON_API_BASE_URL}/team/${id}/`

  // Fetch data with Basic Authentication
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${base64Credentials}`,
    },
  })

  if (!res.ok) {
    throw new Error(`unable to find team - ${res.statusText}`)
  }

  return res.json()
}

async function getTeamIssues(id: number) {
  // Create a base64-encoded credentials string
  const base64Credentials = btoa(
    `${process.env.METRON_USERNAME}:${process.env.METRON_PASSWORD}`,
  )
  const url = `${process.env.METRON_API_BASE_URL}/team/${id}/issue_list/`

  // Fetch data with Basic Authentication
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${base64Credentials}`,
    },
  })

  if (!res.ok) {
    throw new Error(`Error: unable to find team issues - ${res.statusText}`)
  }

  return res.json()
}

export default async function Page({ params }: { params: { id: number } }) {
  const teamInfo: TeamInfo = await getTeamInfo(params.id)
  const teamIssues: ListIssueDataWrapper = await getTeamIssues(params.id)

  return (
    <div className="flex flex-col m-4">
      <div className="self-center py-4 text-6xl text-blue-600">
        {teamInfo.name}
      </div>
      <div className="self-center py-4">
        <Image
          src={teamInfo.image ? teamInfo.image : ''}
          alt={`image of ${teamInfo.name}`}
          height={700}
          width={450}
        />
      </div>
      <div className="p-10">{teamInfo.desc}</div>
      <div>
        <div className="flex flex-col self-center">
          <div className="pb-4 text-4xl">Appearing in these issues:</div>
          {teamIssues.results.map((issue, index) => {
            return (
              <Link
                href={`/issue/${issue.id}`}
                key={index}
                className="self-center py-1 pl-8"
              >
                {issue.series.name} Vol {issue.series.volume} #{issue.number} (
                {toUSDate(issue.cover_date)})
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
