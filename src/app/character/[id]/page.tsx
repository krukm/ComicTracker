import { getCharacter } from '../../api/requests/character-requests'
import { CharacterInfo } from '../../../../types/character/character-info'
import Image from 'next/image'
import Link from 'next/link'

export default async function Character({ params }: { params: { id: number } }) {
  const character: CharacterInfo = await getCharacter(params.id)

  return (
    <div className="page">
      <div className="page-header">
        <div>{character.name}</div>
        {character.alias && character.alias?.length > 0 ? (
          <div className="flex self-center text-sm md:text-lg">
            <div className="pr-2">AKA:</div>
            {character.alias?.map((alias, index) => {
              return (
                <div key={index} className="pr-1">
                  {alias}{' '}
                  {character.alias && index < character.alias?.length - 1
                    ? '-'
                    : ''}
                </div>
              )
            })}
          </div>
        ) : (
          <></>
        )}
      </div>
      <Link href={`/issue-list/${params.id}/1`} className="list-item mt-4">
        List of Issues featuring {character.name}
      </Link>
      <div className="character-container">
        {character.teams.length > 0 ? (
          <div className="team-container">
            <div className="page-subheading">Member of:</div>
            {character.teams.map((team, index) => {
              return (
                <Link
                  key={index}
                  href={`/team/${team.id}`}
                  className="team-item"
                  scroll={false}
                >
                  {team.name}
                </Link>
              )
            })}
          </div>
        ) : (
          <></>
        )}
        <div className="image-container">
          <Image
            className="image"
            src={character.image ? character.image : ''}
            alt={`image of ${character.name}`}
            height={700}
            width={500}
          />
        </div>
        <div className="self-center p-4 md:p-10">{character.desc}</div>
      </div>
    </div>
  )
}
