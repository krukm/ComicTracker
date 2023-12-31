import { Issue } from '@/types/issue'
import Image from 'next/image'

async function getIssue(id: number) {
  // Create a base64-encoded credentials string
  const base64Credentials = btoa(
    `${process.env.METRON_USERNAME}:${process.env.METRON_PASSWORD}`,
  )
  const url = `${process.env.METRON_API_BASE_URL}/issue/${id}/`

  // Fetch data with Basic Authentication
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${base64Credentials}`,
    },
  })

  if (!res.ok) {
    throw new Error('unable to fetch issue')
  }

  return res.json()
}

export default async function Page({ params }: { params: { id: number } }) {
  const issue: Issue = await getIssue(params.id)

  return (
    <main className="w-2/3 m-auto bg-">
      <div className="w-1/3 m-auto pb-16">
        <div className="text-3xl py-5">
          {issue.series.name} #{issue.number}
        </div>
        <Image
          className="outline"
          src={issue.image ? issue.image : ''}
          alt={
            issue.image
              ? `image of ${issue.series.name} number ${issue.number}`
              : ''
          }
          height={500}
          width={300}
        ></Image>
      </div>
      <div className="text-3xl">{issue.name}</div>
      <div className="pt-2.5">{issue.desc}</div>
    </main>
  )
}
