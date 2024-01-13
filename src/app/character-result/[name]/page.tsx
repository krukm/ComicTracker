import { CharacterResultDataWrapper } from '@/types/character-result'
import Link from 'next/link'

async function getCharacterResult(name: string) {
  // Create a base64-encoded credentials string
  const base64Credentials = btoa(
    `${process.env.METRON_USERNAME}:${process.env.METRON_PASSWORD}`,
  )
  const url = `${process.env.METRON_API_BASE_URL}/character/?name=${name}`

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

export default async function Page({ params }: { params: { name: string } }) {
  const characterList: CharacterResultDataWrapper = await getCharacterResult(
    params.name,
  )

  return (
    <div>
      <div className="grid grid-rows-auto">
        {characterList.results.map((character, i) => {
          return (
            <Link
              className="py-2 pl-8"
              key={i}
              href={`/character/${character.id}`}
            >
              <div className="text-2xl">{character.name}</div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
