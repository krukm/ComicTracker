import { ListTeamDataWrapper } from '@/types/team/list-team'
import { capitalizeRegex, regex } from '@/utils/regex'
import Link from 'next/link'

async function getTeamList(name: string) {
  // Create a base64-encoded credentials string
  const base64Credentials = btoa(
    `${process.env.METRON_USERNAME}:${process.env.METRON_PASSWORD}`,
  )

  // Fetch data with Basic Authentication
  const res = await fetch(
    `${process.env.METRON_API_BASE_URL}/team/?name=${name}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${base64Credentials}`,
      },
    },
  )

  if (!res.ok) {
    throw new Error(`Received response: ${res.statusText}`)
  }

  return res.json()
}

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
