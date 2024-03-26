import { getTeamList } from '../../api/requests/team-requests'
import { ListTeamDataWrapper } from '../../../../types/team/list-team'
import { formattedName } from '../../../../utils/regex'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function TeamList({
  params,
}: {
  params: { name: string }
}) {
  const teamList: ListTeamDataWrapper = await getTeamList(params.name)

  if (teamList.results.length === 1) {
    redirect(`/team/${teamList.results[0].id}`)
  } else if (teamList.results.length === 0) {
    return (
      <div className="p-12 text-2xl">
        Sorry, no team named {formattedName(params.name)} found.
      </div>
    )
  }

  return (
    <div className="page">
      <div className="page-subheading pt-10">
        Teams matching {formattedName(params.name)}:
      </div>
      {teamList.results.map((team, index) => {
        return (
          <Link key={index} href={`/team/${team.id}`} className="comic-box">
            {team.name}
          </Link>
        )
      })}
    </div>
  )
}
