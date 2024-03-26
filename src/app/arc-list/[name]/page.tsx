import { getArcs } from '../../api/requests/arc-requests'
import { ArcResultDataWrapper } from '../../../../types/arc/arc-result'
import { formattedName } from '../../../../utils/regex'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function ArcList({
  params,
}: {
  params: { name: string }
}) {
  const arcs: ArcResultDataWrapper = await getArcs(params.name)

  if (arcs.results.length === 1) {
    redirect(`/arc-info/arc/${arcs.results[0].id}/1`)
  } else if (arcs.results.length === 0) {
    return (
      <div className="p-12 text-2xl">
        Sorry, no arc named {formattedName(params.name)} found.
      </div>
    )
  }

  return (
    <div className="page">
      <div className="page-header">
        Story Arcs for {formattedName(params.name)}
      </div>
      <div className="flex flex-col self-center pt-4">
        {arcs.results.length > 0 ? (
          arcs.results.map((arc, index) => {
            return (
              <Link
                key={index}
                href={`/arc-info/arc/${arc.id}/1`}
                className="comic-box"
              >
                {arc.name}
              </Link>
            )
          })
        ) : (
          <div className="pt-20 text-2xl">
            Sorry nothing found for {formattedName(params.name)}
          </div>
        )}
      </div>
    </div>
  )
}
