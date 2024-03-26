import { BASE_HEADERS } from '../../../../utils/constants'

export async function getPaginatedIssueList(
  searchType: string,
  id: string,
  page: string,
) {
  const url = `${process.env.METRON_API_BASE_URL}/${searchType}/${id}/issue_list/?page=${page}`

  const res = await fetch(url, {
    method: 'GET',
    headers: BASE_HEADERS,
  })

  if (!res.ok) {
    throw new Error(
      `fetching issues for ${searchType} ${id}: ${res.statusText}`,
    )
  }
  let data = await res.json()
  return data
}
