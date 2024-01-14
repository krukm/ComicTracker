import { CharacterInfo } from '@/types/character/character-info'
import { ListIssueDataWrapper } from '@/types/issue/list-issue'
import { toYearOnly } from '@/utils/dates'
import Image from 'next/image'
import Link from 'next/link'

async function getCharacter(id: number) {
  // Create a base64-encoded credentials string
  const base64Credentials = btoa(
    `${process.env.METRON_USERNAME}:${process.env.METRON_PASSWORD}`,
  )
  const url = `${process.env.METRON_API_BASE_URL}/character/${id}/`

  // Fetch data with Basic Authentication
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${base64Credentials}`,
    },
  })

  if (!res.ok) {
    throw new Error(`Error: unable to find character - ${res.statusText}`)
  }

  return res.json()
}

async function getCharacterIssues(id: number) {
  // Create a base64-encoded credentials string
  const base64Credentials = btoa(
    `${process.env.METRON_USERNAME}:${process.env.METRON_PASSWORD}`,
  )
  const url = `${process.env.METRON_API_BASE_URL}/character/${id}/issue_list/`

  // Fetch data with Basic Authentication
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${base64Credentials}`,
    },
  })

  if (!res.ok) {
    throw new Error(`Error: unable to find character - ${res.statusText}`)
  }

  return res.json()
}

export default async function Page({ params }: { params: { id: number } }) {
  const character: CharacterInfo = await getCharacter(params.id)
  const characterIssues: ListIssueDataWrapper = await getCharacterIssues(
    params.id,
  )

  return (
    <div className="flex flex-col m-0 w-auto px-2 md:p-8 bg-slate-400">
      <div className="flex flex-col self-center mt-4 p-3 bg-white border-4 border-gray-900 shadow-lg shadow-black">
        <div className="self-center md:p-0 text-5xl md:text-6xl">
          {character.name}
        </div>
        {character.alias && character.alias?.length > 0 ? (
          <div className="flex self-center text-sm md:text-lg">
            <div>AKA:</div>
            <div>
              {character.alias?.map((alias, index) => {
                return <div key={index}>&nbsp;{alias}</div>
              })}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="flex flex-col md:flex-row md:p-4 self-center">
        <div>
          {character.teams.length > 0 ? (
            <div className="flex flex-col pb-2 md:p-4">
              <div className="text-lg md:mb-2">Member of:</div>
              {character.teams.map((team, index) => {
                return (
                  <Link
                    key={index}
                    href={`/team/${team.id}`}
                    className="py-1 px-2 rounded-md border-2 border-slate-500 bg-slate-300"
                  >
                    {team.name}
                  </Link>
                )
              })}
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="relative aspect-square md:min-w-52">
          <Image
            className="w-full object-cover rounded-md border-2 border-slate-500 shadow-md shadow-black"
            src={character.image ? character.image : ''}
            alt={`image of ${character.name}`}
            fill
          />
        </div>
        <div className="p-4 md:p-10">{character.desc}</div>
      </div>
      <div className="flex flex-col pb-20">
        <div className="pb-2 text-4xl">Appearing in issues:</div>
        <div className="columns-1 md:columns-3 md:gap-8">
          {characterIssues.results.map((issue, index) => {
            return (
              <Link
                key={index}
                href={`/issue/${issue.id}`}
                className="flex px-2 rounded-md border-2 border-slate-500 bg-slate-300"
              >
                <div className="basis-6/12 grow">
                  {issue.series.name} #{issue.number}
                </div>
                <div className="basis-2/12">Vol {issue.series.volume}</div>
                <div className="basis-1/12">
                  ({toYearOnly(issue.cover_date)})
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
