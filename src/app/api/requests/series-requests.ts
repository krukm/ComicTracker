import { BASE_HEADERS } from '@/utils/constants'

export async function getSeries(name: string) {
  const res = await fetch(
    `${process.env.METRON_API_BASE_URL}/series/?name=${name}`,
    {
      method: 'GET',
      headers: BASE_HEADERS,
    },
  )

  if (!res.ok) {
    throw new Error(`unable to fetch series - ${res.statusText}`)
  }
  return res.json()
}

export async function getPaginatedSeriesIssueList(urlParams: string) {
  const page = urlParams.split('page').pop()
  const id = urlParams.substring(0, urlParams.indexOf('page'))
  const url = `${process.env.METRON_API_BASE_URL}/series/${id}/issue_list/?page=${page}`

  const res = await fetch(url, {
    method: 'GET',
    headers: BASE_HEADERS,
  })

  if (!res.ok) {
    throw new Error(`unable to fetch series issues - ${res.statusText}`)
  }
  return res.json()
}
