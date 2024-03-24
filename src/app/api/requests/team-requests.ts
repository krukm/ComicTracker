import { BASE_HEADERS } from '@/utils/constants'

export async function getTeamList(name: string) {
  const url = `${process.env.METRON_API_BASE_URL}/team/?name=${name}`

  const res = await fetch(url, {
    method: 'GET',
    headers: BASE_HEADERS,
  })

  if (!res.ok) {
    throw new Error(`unable to find team - ${res.statusText}`)
  }
  return res.json()
}

export async function getTeamInfo(id: number) {
  const url = `${process.env.METRON_API_BASE_URL}/team/${id}/`

  const res = await fetch(url, {
    method: 'GET',
    headers: BASE_HEADERS,
  })

  if (!res.ok) {
    throw new Error(`unable to find team - ${res.statusText}`)
  }

  let data = await res.json()
  return data
}

export async function getTeamIssues(id: number) {
  const url = `${process.env.METRON_API_BASE_URL}/team/${id}/issue_list/`

  const res = await fetch(url, {
    method: 'GET',
    headers: BASE_HEADERS,
  })

  if (!res.ok) {
    throw new Error(`unable to find team issues - ${res.statusText}`)
  }
  let data = await res.json()
  return data
}
