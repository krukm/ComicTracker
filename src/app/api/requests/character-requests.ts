import { BASE_HEADERS } from '@/utils/constants'

export async function getCharacterResult(name: string) {
  const url = `${process.env.METRON_API_BASE_URL}/character/?name=${name}`

  const res = await fetch(url, {
    method: 'GET',
    headers: BASE_HEADERS,
  })

  if (!res.ok) {
    throw new Error(`unable to find character - ${res.statusText}`)
  }
  return res.json()
}

export async function getCharacter(id: number) {
  const url = `${process.env.METRON_API_BASE_URL}/character/${id}/`

  const res = await fetch(url, {
    method: 'GET',
    headers: BASE_HEADERS,
  })

  if (!res.ok) {
    throw new Error(`unable to find character - ${res.statusText}`)
  }
  return res.json()
}

export async function getCharacterIssues(id: number) {
  const url = `${process.env.METRON_API_BASE_URL}/character/${id}/issue_list/`

  const res = await fetch(url, {
    method: 'GET',
    headers: BASE_HEADERS,
  })
  if (!res.ok) {
    throw new Error(`unable to find character issues - ${res.statusText}`)
  }
  return res.json()
}