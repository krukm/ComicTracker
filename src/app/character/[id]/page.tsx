import { CharacterInfo } from '@/types/character-info'
import { ListIssueDataWrapper } from '@/types/list-issue'
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
    <div className="flex flex-col m-8">
      <div className="self-center text-6xl">{character.name}</div>
      <div className="flex self-center text-lg">
        <div>AKA:</div>
        <div>
          {character.alias?.map((alias, index) => {
            return <div key={index}>&nbsp;{alias}</div>
          })}
        </div>
      </div>
      <div className="flex p-4 self-center">
        <Image
          src={character.image ? character.image : ''}
          alt={`image of ${character.name}`}
          height={500}
          width={350}
        ></Image>
        <div>
          {character.teams ? (
            <div className="p-4">
              <div className="mb-2">Member of:</div>
              {character.teams.map((team, index) => {
                return (
                  <div key={index} className="py-1 pl-4">
                    {team.name}
                  </div>
                )
              })}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="p-10">{character.desc}</div>
      <div className="flex flex-col self-center">
        <div className="pb-4 text-4xl">Appearing in these issues:</div>
        {characterIssues.results.map((issue, index) => {
          return (
            <Link key={index} href={`/issue/${issue.id}`} className="py-1 pl-8">
              {issue.series.name} #{issue.number}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
