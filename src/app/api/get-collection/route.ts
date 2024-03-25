import { NextResponse } from 'next/server'
import { CollectionItem } from '../../../../types/collection'
import prisma from '../../../../prisma/prisma'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const collection: CollectionItem[] = await prisma.collection.findMany()
  return NextResponse.json(collection, { status: 200 })
}
