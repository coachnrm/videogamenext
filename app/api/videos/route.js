import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  return Response.json(await prisma.VideoGames.findMany())
}

export async function POST(req) {
  try {
    const { Title, Platform, Developer, Publisher } = await req.json()
    const newPost = await prisma.VideoGames.create({
      data: {
        Title,
        Platform,
        Developer,
        Publisher
      },
    })
    return Response.json(newPost)
  } catch (error) {
    return new Response(error, {
      status: 500,
    })
  }
}