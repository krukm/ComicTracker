import { IssueInfo } from '@/types/issue/issue-info'
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
  const issue: IssueInfo = await getIssue(params.id)

  const getVariantCovers = (): string[] => {
    const covers: string[] = []
    if (issue.variants.length > 0) {
      issue.variants.forEach((variant) => {
        covers.push(variant.image)
      })
    }
    return covers
  }

  return (
    <div className="w-2/3 m-auto bg-blend-color">
      <div className="pb-16">
        <div className="text-center text-3xl py-5">
          {issue.series.name} #{issue.number}
        </div>
        <div className="flex justify-center">
          <Image
            className="outline-double flex-shrink-0 pr-2"
            src={issue.image ? issue.image : ''}
            alt={
              issue.image
                ? `image of ${issue.series.name} number ${issue.number}`
                : ''
            }
            height={350}
            width={175}
          />
          {issue.variants.length > 0 ? (
            getVariantCovers().map((variant) => {
              return (
                <Image
                  className="outline flex-shrink-0 px-2"
                  key={Math.random() * 10}
                  src={variant}
                  alt={
                    variant
                      ? `image of ${issue.series.name} number ${issue.number} variant cover`
                      : ''
                  }
                  height={350}
                  width={175}
                />
              )
            })
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="text-3xl">{issue.name}</div>
      <div className="pt-2.5">{issue.desc}</div>
    </div>
  )
}
