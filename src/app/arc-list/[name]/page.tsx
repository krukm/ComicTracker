import { getArcs } from '../../api/requests/arc-requests'
import { ArcResultDataWrapper } from '../../../../types/arc/arc-result'
import { formattedName } from '../../../../utils/regex'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function ArcList({ params }: { params: { name: string } }) {
  const arcs: ArcResultDataWrapper = await getArcs(params.name)

  if (arcs.results.length === 1) {
    redirect(`/arc-info/${arcs.results[0].id}`)
  }

  return (
    <div className="page">
      <div className="page-header">
        Story Arcs for {formattedName(params.name)}
      </div>
      <div className="flex flex-col self-center pt-4">
        {arcs.results.map((arc, index) => {
          return (
            <Link
              key={index}
              href={`/arc-info/${arc.id}`}
              className="comic-box"
            >
              {arc.name}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
