import { NextResponse } from 'next/server'
import prisma from '../../../../prisma/prisma'

export const runtime = 'edge'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const issue_id = searchParams.get('issue_id')
  const issue_number = searchParams.get('issue_number')
  const issue_name = searchParams.get('issue_name')
  const cover_date = searchParams.get('cover_date')
  const series_name = searchParams.get('series_name')
  const series_id = searchParams.get('series_id')

  if (!issue_id || !issue_number || !series_name) {
    throw new Error('all params required')
  }

  const issue = await prisma.collection.create({
    data: {
      issue_id: Number(issue_id),
      issue_number: issue_number,
      issue_name: issue_name ? issue_name : 'unavailable',
      cover_date: cover_date ? cover_date : 'unknown',
      series_name: series_name,
    },
  })

  return NextResponse.redirect(new URL(`/my-collection/`, request.url))
}
