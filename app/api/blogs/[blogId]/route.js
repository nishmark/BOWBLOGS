import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/blogs/[blogId] - Get a single blog by ID
export async function GET(request, { params }) {
  try {
    const { blogId } = await params;

    if (!blogId) {
      return NextResponse.json(
        { error: 'Blog ID is required' },
        { status: 400 }
      );
    }

    const blog = await prisma.blog.findUnique({
      where: {
        id: blogId,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });

    if (!blog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error('Error fetching blog:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/blogs/[blogId] - Update a blog by ID
export async function PUT(request, { params }) {
  try {
    const { blogId } = await params;
    const body = await request.json();
    const { title, body: blogBody, image, isPublished } = body;

    if (!blogId) {
      return NextResponse.json(
        { error: 'Blog ID is required' },
        { status: 400 }
      );
    }

    const updatedBlog = await prisma.blog.update({
      where: {
        id: blogId,
      },
      data: {
        title,
        body: blogBody,
        image,
        isPublished,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json(updatedBlog);
  } catch (error) {
    console.error('Error updating blog:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/blogs/[blogId] - Delete a blog by ID
export async function DELETE(request, { params }) {
  try {
    const { blogId } = await params;

    if (!blogId) {
      return NextResponse.json(
        { error: 'Blog ID is required' },
        { status: 400 }
      );
    }

    await prisma.blog.delete({
      where: {
        id: blogId,
      },
    });

    return NextResponse.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}