import { getIssue } from '@/app/api/requests/issue-requests'
import { IssueInfo } from '@/types/issue/issue-info'
import { toUSDate } from '@/utils/dates'
import Image from 'next/image'

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
    <div className="page">
      <div className="page-header">
        <div>{issue.series.name} #{issue.number}</div>
        <div className='flex self-center text-sm md:text-lg'>{toUSDate(issue.cover_date)}</div>
      </div>
      <div className="flex flex-col md:flex-row self-center mt-2">
        <div className="image-container">
          <Image
            className="image-issue"
            src={issue.image ? issue.image : ''}
            alt={
              issue.image
                ? `image of ${issue.series.name} number ${issue.number}`
                : ''
            }
            height={500}
            width={300}
          />
        </div>
        <div className="md:self-center md:m-6">
          <div className="page-subheader">{issue.name}</div>
          <div className="px-8 md:px-2 pb-20 md:pb-0">{issue.desc}</div>
        </div>
      </div>
      {issue.variants.length > 0 ? (
        <div className="-mt-16 md:mt-0">
          <div className="page-subheader">Variant Covers:</div>
          <div className="flex flex-col md:flex-row justify-start mt-2">
            {getVariantCovers().map((variant, index) => {
              return (
                  <div className="image-container">
                    <Image
                      className="image-issue"
                      key={index}
                      src={variant}
                      alt={
                        variant
                          ? `image of ${issue.series.name} number ${issue.number} variant cover`
                          : ''
                      }
                      height={500}
                      width={300}
                    />
                  </div>
              )
            })}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}
