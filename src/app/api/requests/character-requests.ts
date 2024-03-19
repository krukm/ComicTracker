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

export async function getPaginatedCharacterIssueList(urlParams: string) {
  const page = urlParams.split('page').pop()
  const id = urlParams.substring(0, urlParams.indexOf('page'))
  console.log(`getPaginatedCharacterIssueList page: ${page}, id: ${id}`)
  const url = `${process.env.METRON_API_BASE_URL}/character/${id}/issue_list/?page=${page}`

  console.log(`url = ${url}`)
  const res = await fetch(url, {
    method: 'GET',
    headers: BASE_HEADERS,
  })

  if (!res.ok) {
    throw new Error(`unable to find issues - ${res.statusText}`)
  }

  return res.json()
}
