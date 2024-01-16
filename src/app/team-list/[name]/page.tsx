import { getTeamList } from '@/app/api/requests/team-requests'
import { ListTeamDataWrapper } from '@/types/team/list-team'
import { capitalizeRegex, regex } from '@/utils/regex'
import Link from 'next/link'

export default async function Page({ params }: { params: { name: string } }) {
  const teamList: ListTeamDataWrapper = await getTeamList(params.name)
  const formattedTeamName = params.name
    .replace(regex, ' ')
    .replace(capitalizeRegex, (letter) => letter.toUpperCase())

  return (
    <div className="flex flex-col self-center m-10">
      <div className="self-center py-8 text-5xl text-blue-600">
        Teams matching {formattedTeamName}:
      </div>
      {teamList.results.map((team, index) => {
        return (
          <Link
            key={index}
            href={`/team/${team.id}`}
            className="self-center p-3 text-2xl"
          >
            {team.name}
          </Link>
        )
      })}
    </div>
  )
}
