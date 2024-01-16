import {
  getCharacter,
  getCharacterIssues,
} from '@/app/api/requests/character-requests'
import { CharacterInfo } from '@/types/character/character-info'
import { ListIssueDataWrapper } from '@/types/issue/list-issue'
import { toYearOnly } from '@/utils/dates'
import Image from 'next/image'
import Link from 'next/link'

export default async function Page({ params }: { params: { id: number } }) {
  const character: CharacterInfo = await getCharacter(params.id)
  const characterIssues: ListIssueDataWrapper = await getCharacterIssues(
    params.id,
  )

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
            fill
          />
        </div>
        <div className="mt-4 p-4 md:p-10">{character.desc}</div>
      </div>
      <div className="issue-list-container">
        <div className="page-subheader">Appearing in issues:</div>
        <div className="issue-list">
          {characterIssues.results.map((issue, index) => {
            return (
              <Link
                key={index}
                href={`/issue/${issue.id}`}
                className="list-item"
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
