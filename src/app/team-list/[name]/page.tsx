import { getTeamList } from '@/app/api/requests/team-requests'
import { ListTeamDataWrapper } from '@/types/team/list-team'
import { formattedName } from '@/utils/regex'
import Link from 'next/link'

export default async function Page({ params }: { params: { name: string } }) {
  const teamList: ListTeamDataWrapper = await getTeamList(params.name)

  return (
    <div className="page">
      <div className="page-subheading">
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
