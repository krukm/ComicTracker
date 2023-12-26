import { SeriesDataWrapper } from "@/types/series";

async function getSeries(name: string) {

  // Create a base64-encoded credentials string
  const base64Credentials = btoa(`${process.env.METRON_USERNAME}:${process.env.METRON_PASSWORD}`);

  // Fetch data with Basic Authentication
  const res = await fetch(`${process.env.METRON_API_BASE_URL}/series/?name=${name}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${base64Credentials}`,
    },
  })

  if (!res.ok) {
    throw new Error("Something went wrong")
  }

  return res.json()
}

export default async function Home() {
  const series: SeriesDataWrapper = await getSeries("x-men")

  return (
    <main>
      <div>
        <ul className="series-list">
          {series.results.map((series, i) => {
            return <li className="series-item" key={i}>{series.series}</li>
          })}
        </ul>
      </div>
    </main>
  )
}
