import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET: Fetch a single post by ID
export async function GET(req, context) {
  try {
    //const { id } = params
    const { id } = await context.params; // Ensure context.params is properly accessed
    const post = await prisma.VideoGames.findUnique({
      where: { Id: Number(id) }, // Convert id to a number
    });

    if (!post) {
      return new Response(JSON.stringify({ error: 'Post not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    console.error('Error fetching post:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch post' }), { status: 500 });
  }
}

// PUT: Update a post by ID
export async function PUT(req, { params }) {
  try {
    const { Title, Platform, Developer, Publisher } = await req.json();

    const updatedPost = await prisma.VideoGames.update({
      where: { Id: Number(params.id) },
      data: { Title, Platform, Developer, Publisher },
    });

    return new Response(JSON.stringify(updatedPost), { status: 200 });
  } catch (error) {
    console.error('Error updating post:', error);
    return new Response(JSON.stringify({ error: 'Failed to update post' }), { status: 500 });
  }
}

// DELETE: Delete a post by ID
export async function DELETE(req, context) {
  try {
    //const { id } = params
    const { id } = await context.params; // Ensure context.params is properly accessed
    const deletedPost = await prisma.VideoGames.delete({
      where: { Id: Number(id) },
    });

    return new Response(JSON.stringify(deletedPost), { status: 200 });
  } catch (error) {
    console.error('Error deleting post:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete post' }), { status: 500 });
  }
}
