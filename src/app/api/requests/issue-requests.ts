import { BASE_HEADERS } from '../../../../utils/constants'

export async function getIssue(id: number) {
  const url = `${process.env.METRON_API_BASE_URL}/issue/${id}/`

  const res = await fetch(url, {
    method: 'GET',
    headers: BASE_HEADERS,
  })

  if (!res.ok) {
    throw new Error(`unable to fetch issue: ${id} - ${res.statusText}`)
  }
  let data = await res.json()
  return data
}

export async function getPageIssuesList(url: string) {
  const res = await fetch(url, {
    method: 'GET',
    headers: BASE_HEADERS,
  })

  if (!res.ok) {
    throw new Error(`unable to find issues from: ${url} - ${res.statusText}`)
  }

  let data = await res.json()
  return data
}
