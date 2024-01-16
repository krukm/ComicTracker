import { getCharacterResult } from '@/app/api/requests/character-requests'
import { CharacterResultDataWrapper } from '@/types/character/character-result'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function Page({ params }: { params: { name: string } }) {
  const characterList: CharacterResultDataWrapper = await getCharacterResult(
    params.name,
  )

  if (characterList.results.length === 1) {
    redirect(`/character/${characterList.results[0].id}`)
  }

  return (
    <div className="flex flex-col items-center">
      <div className="my-12 mx-4 md:mx-0 text-6xl">Which {params.name}?</div>
      {characterList.results.map((character, i) => {
        return (
          <Link
            className="mt-4 p-3 bg-white border-4 border-gray-900 shadow-lg shadow-black"
            key={i}
            href={`/character/${character.id}`}
          >
            <div className="text-2xl">{character.name}</div>
          </Link>
        )
      })}
    </div>
  )
}
