import { ArcResultDataWrapper } from '@/types/arc/arc-result'
import { capitalizeRegex, regex } from '@/utils/regex'
import Link from 'next/link'

async function getArcs(name: string) {
  // Create a base64-encoded credentials string
  const base64Credentials = btoa(
    `${process.env.METRON_USERNAME}:${process.env.METRON_PASSWORD}`,
  )

  // Fetch data with Basic Authentication
  const res = await fetch(
    `${process.env.METRON_API_BASE_URL}/arc/?name=${name}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${base64Credentials}`,
      },
    },
  )

  if (!res.ok) {
    throw new Error(`Received response: ${res.statusText}`)
  }

  return res.json()
}

export default async function Page({ params }: { params: { name: string } }) {
  const arcs: ArcResultDataWrapper = await getArcs(params.name)
  const formattedArcName = params.name
    .replace(regex, ' ')
    .replace(capitalizeRegex, (letter) => letter.toUpperCase())

  return (
    <div className="flex flex-col self-center m-8">
      <div className="self-center py-4 text-5xl text-blue-600">
        Story Arcs for {formattedArcName}
      </div>
      <div className="self-center pt-4">
        {arcs.results.map((arc, index) => {
          return (
            <Link
              key={index}
              href={`/arc-info/${arc.id}`}
              className="p-1 text-3xl"
            >
              {arc.name}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
