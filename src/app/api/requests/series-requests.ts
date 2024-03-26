import { BASE_HEADERS } from '../../../../utils/constants'

export async function getSeries(name: string) {
  const res = await fetch(
    `${process.env.METRON_API_BASE_URL}/series/?name=${name}`,
    {
      method: 'GET',
      headers: BASE_HEADERS,
    },
  )

  if (!res.ok) {
    throw new Error(`fetch series for ${name}: ${res.statusText}`)
  }
  let data = await res.json()
  return data
}

export async function getSeriesInfo(id: string) {
  const url = `${process.env.METRON_API_BASE_URL}/series/${id}/`

  const res = await fetch(url, {
    method: 'GET',
    headers: BASE_HEADERS,
  })

  if (!res.ok) {
    throw new Error(`fetching issues for ${id}: ${res.statusText}`)
  }
  let data = await res.json()
  return data
}
