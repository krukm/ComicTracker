import { ArcInfo } from '@/types/arc/arc-info'
import { ListIssueDataWrapper } from '@/types/issue/list-issue'
import Image from 'next/image'
import Link from 'next/link'

async function getArc(id: number) {
  // Create a base64-encoded credentials string
  const base64Credentials = btoa(
    `${process.env.METRON_USERNAME}:${process.env.METRON_PASSWORD}`,
  )
  const url = `${process.env.METRON_API_BASE_URL}/arc/${id}/`

  // Fetch data with Basic Authentication
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${base64Credentials}`,
    },
  })

  if (!res.ok) {
    throw new Error(`Error: unable to find character - ${res.statusText}`)
  }

  return res.json()
}

async function getArcIssues(id: number) {
  // Create a base64-encoded credentials string
  const base64Credentials = btoa(
    `${process.env.METRON_USERNAME}:${process.env.METRON_PASSWORD}`,
  )
  const url = `${process.env.METRON_API_BASE_URL}/arc/${id}/issue_list/`

  // Fetch data with Basic Authentication
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${base64Credentials}`,
    },
  })

  if (!res.ok) {
    throw new Error(`Error: unable to find character - ${res.statusText}`)
  }

  return res.json()
}

export default async function Page({ params }: { params: { id: number } }) {
  const arc: ArcInfo = await getArc(params.id)
  const arcIssues: ListIssueDataWrapper = await getArcIssues(params.id)

  return (
    <div className="flex flex-col m-8">
      <div className="self-center text-6xl">{arc.name}</div>
      <div className="flex p-4 self-center">
        <Image
          src={arc.image ? arc.image : ''}
          alt={`image of ${arc.name} story arc`}
          height={500}
          width={350}
        ></Image>
      </div>
      <div className="p-10">{arc.desc}</div>
      <div className="flex flex-col self-center">
        <div className="pb-4 text-4xl">Across these issues:</div>
        {arcIssues.results.map((issue, index) => {
          return (
            <Link key={index} href={`/issue/${issue.id}`} className="py-1 pl-8">
              {issue.series.name} #{issue.number}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
