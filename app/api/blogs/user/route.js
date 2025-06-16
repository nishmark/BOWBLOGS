import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/blogs/user - Get published blogs for a specific user
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Get published blogs for this user directly using userId
    const blogs = await prisma.blog.findMany({
      where: {
        authorId: userId,
        isPublished: true,
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
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: skip,
    });

    // Get total count for pagination info
    const totalBlogs = await prisma.blog.count({
      where: {
        authorId: userId,
        isPublished: true,
      },
    });

    const totalPages = Math.ceil(totalBlogs / limit);
    const hasMore = page < totalPages;

    return NextResponse.json({
      blogs,
      pagination: {
        currentPage: page,
        totalPages,
        totalBlogs,
        hasMore,
        limit,
      },
    });
  } catch (error) {
    console.error('Error fetching user blogs:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 