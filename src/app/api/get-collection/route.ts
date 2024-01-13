import { sql } from '@vercel/postgres'
import { NextResponse } from 'next/server'

export async function GET() {
  let collection

  try {
    collection = await sql`SELECT * FROM collection;`
  } catch (error) {
    return NextResponse.json({ error })
  }
  return NextResponse.json({ data: collection })
}
