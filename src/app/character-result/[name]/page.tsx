import { getCharacterResult } from '../../api/requests/character-requests'
import { CharacterResultDataWrapper } from '../../../../types/character/character-result'
import { formattedName } from '../../../../utils/regex'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function CharacterResult({
  params,
}: {
  params: { name: string }
}) {
  const characterList: CharacterResultDataWrapper = await getCharacterResult(
    params.name,
  )

  if (characterList.results.length === 1) {
    redirect(`/character/character/${characterList.results[0].id}/1`)
  } else if (characterList.results.length === 0) {
    return (
      <div className="p-12 text-2xl">
        Sorry, no character named {formattedName(params.name)} found.
      </div>
    )
  }

  return (
    <div className="page">
      <div className="page-subheader">Which {formattedName(params.name)}?</div>
      {characterList.results.map((character, i) => {
        return (
          <Link
            className="comic-box"
            key={i}
            href={`/character/character/${character.id}/1`}
          >
            {character.name}
          </Link>
        )
      })}
    </div>
  )
}
