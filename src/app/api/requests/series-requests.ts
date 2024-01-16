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

export async function getSeriesIssues(id: number) {
  const url = `${process.env.METRON_API_BASE_URL}/series/${id}/issue_list/`

  const res = await fetch(url, {
    method: 'GET',
    headers: BASE_HEADERS,
  })

  if (!res.ok) {
    throw new Error(`unable to fetch series issues - ${res.statusText}`)
  }
  return res.json()
}
