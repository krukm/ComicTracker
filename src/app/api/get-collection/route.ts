import { db } from '@vercel/postgres'
import { NextResponse } from 'next/server'

export async function GET() {
  const client = await db.connect()
  let collection

  try {
    collection = await client.sql`SELECT * FROM collection;`
  } catch (error) {
    return NextResponse.json({ error })
  }
  return NextResponse.json({ data: collection })
}
