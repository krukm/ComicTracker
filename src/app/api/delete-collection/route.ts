import { sql } from '@vercel/postgres'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const issue_id = searchParams.get('issue_id') || ''

  try {
    if (!issue_id) throw new Error('id param required')
    await sql`DELETE FROM collection WHERE issue_id = ${issue_id}`
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }

  return NextResponse.redirect(new URL('/my-collection', request.url))
}
