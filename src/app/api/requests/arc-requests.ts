import { BASE_HEADERS } from '../../../../utils/constants'

export async function getArcs(name: string) {
  const url = `${process.env.METRON_API_BASE_URL}/arc/?name=${name}`

  const res = await fetch(url, {
    method: 'GET',
    headers: BASE_HEADERS,
  })

  if (!res.ok) {
    throw new Error(`unable to find story arc - ${res.statusText}`)
  }
  return res.json()
}

export async function getArc(id: string) {
  const url = `${process.env.METRON_API_BASE_URL}/arc/${id}/`

  const res = await fetch(url, {
    method: 'GET',
    headers: BASE_HEADERS,
  })

  if (!res.ok) {
    throw new Error(`unable to find story arc - ${res.statusText}`)
  }
  let data = await res.json()
  return data
}
