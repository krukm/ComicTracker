import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../prisma/prisma'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const issue_id = searchParams.get('issue_id') || ''

  try {
    if (!issue_id) throw new Error('id param required')

    const deleteIssue = await prisma.collection.delete({
      where: {
        issue_id: Number(issue_id),
      },
    })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }

  return NextResponse.redirect(new URL('/my-collection', request.url))
}
