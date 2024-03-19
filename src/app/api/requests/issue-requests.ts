import { BASE_HEADERS } from '@/utils/constants'

export async function getIssue(id: number) {
  const url = `${process.env.METRON_API_BASE_URL}/issue/${id}/`

  const res = await fetch(url, {
    method: 'GET',
    headers: BASE_HEADERS,
  })

  if (!res.ok) {
    throw new Error('unable to fetch issue')
  }
  return res.json()
}

export async function getPageIssuesList(url: string) {
  console.log('call: ', url)

  console.log(url)
  const res = await fetch(url, {
    method: 'GET',
    headers: BASE_HEADERS,
  })

  if (!res.ok) {
    throw new Error(`unable to find issues - ${res.statusText}`)
  }

  return res.json()
}
