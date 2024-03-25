import { getCharacterResult } from '../../api/requests/character-requests'
import { CharacterResultDataWrapper } from '../../../../types/character/character-result'
import { formattedName } from '../../../../utils/regex'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function CharacterResult({ params }: { params: { name: string } }) {
  const characterList: CharacterResultDataWrapper = await getCharacterResult(
    params.name,
  )

  if (characterList.results.length === 1) {
    redirect(`/character/${characterList.results[0].id}`)
  } else if (characterList.results.length === 0) {
    redirect('/')
  }

  return (
    <div className="page">
      <div className="page-subheader">Which {formattedName(params.name)}?</div>
      {characterList.results.map((character, i) => {
        return (
          <Link
            className="comic-box"
            key={i}
            href={`/character/${character.id}`}
          >
            {character.name}
          </Link>
        )
      })}
    </div>
  )
}
