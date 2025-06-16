import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/blogs/user/drafts - Get saved drafts for a specific user
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

    // Get saved drafts (unpublished blogs) for this user directly using userId
    const drafts = await prisma.blog.findMany({
      where: {
        authorId: userId,
        isPublished: false,
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
      orderBy: { updatedAt: 'desc' },
      take: limit,
      skip: skip,
    });

    // Get total count for pagination info
    const totalDrafts = await prisma.blog.count({
      where: {
        authorId: userId,
        isPublished: false,
      },
    });

    const totalPages = Math.ceil(totalDrafts / limit);
    const hasMore = page < totalPages;

    return NextResponse.json({
      drafts,
      pagination: {
        currentPage: page,
        totalPages,
        totalDrafts,
        hasMore,
        limit,
      },
    });
  } catch (error) {
    console.error('Error fetching user drafts:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 