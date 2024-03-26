import { getCharacter } from '../../api/requests/character-requests'
import { CharacterInfo } from '../../../../types/character/character-info'
import Image from 'next/image'
import Link from 'next/link'
import { PaginatedIssueList } from '../../../../types/issue/paginated-issue-list'
import { getPaginatedIssueList } from '@/app/api/requests/pagination-requests'
import { paginationPageNumber } from '../../../../utils/regex'
import { toYearOnly } from '../../../../utils/dates'

export default async function Character({
  params,
}: {
  params: { slug: string[] }
}) {
  const character: CharacterInfo = await getCharacter(params.slug[1])
  const characterList: PaginatedIssueList = await getPaginatedIssueList(
    'character',
    params.slug[1],
    params.slug[2],
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
      <div>
        <div className="issue-list-container">
          <div className="text-3xl">
            {character.name} appears in these issues:
          </div>
          <div className="issue-image-list">
            {characterList.previous ? (
              <Link
                href={`/issue-list/character/${
                  params.slug[1]
                }/${paginationPageNumber(characterList.previous)}`}
                className="list-item justify-center self-center"
              >
                Previous issues
              </Link>
            ) : (
              <></>
            )}
            {characterList.results.map((issue) => {
              return (
                <div className="justify-self-center p-4" key={issue.id}>
                  <Link href={`/issue/${issue.id}`}>
                    <Image
                      className="image-issue"
                      src={issue.image ? issue.image : ''}
                      alt={
                        issue.image
                          ? `image of ${issue.series.name} number ${issue.number}`
                          : ''
                      }
                      height={500}
                      width={300}
                    />
                  </Link>
                  <div className="text-center">
                    #{issue.number} ({toYearOnly(issue.cover_date)})
                  </div>
                  <Link
                    className="list-item"
                    href={`/api/add-collection?issue_id=${
                      issue.id
                    }&issue_number=${
                      issue.number
                    }&issue_name=${issue.issue.replace(
                      '#',
                      '%23',
                    )}&cover_date=${issue.cover_date}&series_name=${
                      issue.series.name
                    }&series_id=${params.slug[1]}`}
                  >
                    <div className="sm-button-text">add</div>
                    <div className="lg-button-text">add to collection</div>
                  </Link>
                </div>
              )
            })}
            {characterList.next ? (
              <Link
                href={`/issue-list/character/${
                  params.slug[1]
                }/${paginationPageNumber(characterList.next)}`}
                className="list-item justify-center self-center"
              >
                More issues
              </Link>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
