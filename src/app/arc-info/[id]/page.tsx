import { getArc, getArcIssues } from '@/app/api/requests/arc-requests'
import { ArcInfo } from '@/types/arc/arc-info'
import { ListIssueDataWrapper } from '@/types/issue/list-issue'
import Image from 'next/image'
import Link from 'next/link'

export default async function Page({ params }: { params: { id: number } }) {
  const arc: ArcInfo = await getArc(params.id)
  const arcIssues: ListIssueDataWrapper = await getArcIssues(params.id)

  return (
    <div className="page">
      <div className="page-header">{arc.name}</div>
      <div className="flex flex-col md:flex-row mt-6">
        <div className="image-holder">
          <Image
            className="image"
            src={arc.image ? arc.image : ''}
            alt={`image of ${arc.name} story arc`}
            fill
          />
        </div>
        <div className="p-4 md:p-10 md:self-center">{arc.desc}</div>
      </div>
      <div className="issue-list-holder">
        <div className="page-subheader">Across these issues:</div>
        <div className="issue-list">
          {arcIssues.results.map((issue, index) => {
            return (
              <Link
                key={index}
                href={`/issue/${issue.id}`}
                className="list-item"
              >
                {issue.series.name} #{issue.number}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
