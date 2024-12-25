import { NextResponse } from 'next/server'
import { connectToDatabase } from '../../../../lib/mongodb'
import { ObjectId } from 'mongodb'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { db } = await connectToDatabase()
    const favorite = await db.collection('favorite_recipes').findOne({ recipeId: params.id })
    return NextResponse.json({ isFavorite: !!favorite })
  } catch (error) {
    return NextResponse.json({ error: 'Error checking favorite status' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { db } = await connectToDatabase()
    await db.collection('favorite_recipes').deleteOne({ _id: new ObjectId(params.id) })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Error removing favorite' }, { status: 500 })
  }
}

