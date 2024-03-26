import Link from 'next/link'
import { IssueInfo } from '../../../../types/issue/issue-info'
import { getIssue } from '../../api/requests/issue-requests'
import { toYearOnly } from '../../../../utils/dates'

export default async function Issue({ params }: { params: { id: number } }) {
  const issue: IssueInfo = await getIssue(params.id)

  return (
    <div className="pt-20 flex flex-col items-center">
      <div className=" bg-slate-300 p-4  border-red-800 border-2 text-red-800 shadow-xl shadow-slate-800">
        * {issue.series.name} #{issue.number} ({toYearOnly(issue.cover_date)})
        added to collection *
      </div>
      <div className="mt-10 flex flex-col">
        <Link href={`/issue/${issue.id}`} className="issue-back-button">
          Go to {issue.series.name} {issue.number}
        </Link>
        <Link
          href={`/series-issues/series/${issue.series.id}/1`}
          className="issue-back-button"
        >
          Go to {issue.series.name}
        </Link>
        <Link href={`/my-collection/`} className="issue-back-button">
          Go to Collection
        </Link>
      </div>
    </div>
  )
}
