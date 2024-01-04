import { sql } from '@vercel/postgres'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const issue_id = searchParams.get('issue_id')
  const issue_number = searchParams.get('issue_number')
  const issue_name = searchParams.get('issue_name')
  const cover_date = searchParams.get('cover_date')
  const series_name = searchParams.get('series_name')
  const series_id = searchParams.get('series_id')

  try {
    if (
      !issue_id ||
      !issue_number ||
      !issue_name ||
      !cover_date ||
      !series_name
    )
      throw new Error('all params required')
    await sql`
              INSERT INTO collection (issue_id, issue_number, issue_name, cover_date, series_name)
              SELECT ${issue_id}, ${issue_number}, ${issue_name}, ${cover_date}, ${series_name}
              WHERE
              NOT EXISTS ( SELECT issue_id FROM collection WHERE issue_id = ${issue_id} )
              `
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }

  return NextResponse.redirect(
    new URL(`/series-issues/${series_id}`, request.url),
  )
}
