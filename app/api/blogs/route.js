import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/blogs - Get 10 latest blogs or 10 more blogs with pagination
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';
    const limit = 10;
    const skip = (page - 1) * limit;

    // Validate sortBy parameter
    const validSortFields = ['createdAt', 'updatedAt', 'title'];
    const validSortOrders = ['asc', 'desc'];
    
    if (!validSortFields.includes(sortBy)) {
      return NextResponse.json(
        { error: 'Invalid sortBy parameter' },
        { status: 400 }
      );
    }
    
    if (!validSortOrders.includes(sortOrder)) {
      return NextResponse.json(
        { error: 'Invalid sortOrder parameter' },
        { status: 400 }
      );
    }

    // Get 10 blogs with pagination and sorting
    const blogs = await prisma.blog.findMany({
      where: {
        isPublished: true, // Only get published blogs
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
      orderBy: { [sortBy]: sortOrder },
      take: limit,
      skip: skip,
    });

    // Get total count for pagination info
    const totalBlogs = await prisma.blog.count({
      where: {
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
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
    try {
      const body = await request.json();
      const { title, body: blogBody, image, authorId, isPublished = false } = body;
  
      // Validate required fields
      if (!title) {
        return NextResponse.json(
          { error: 'Title is required' },
          { status: 400 }
        );
      }
  
      if (!blogBody) {
        return NextResponse.json(
          { error: 'Blog body is required' },
          { status: 400 }
        );
      }
  
      if (!authorId) {
        return NextResponse.json(
          { error: 'Author ID is required' },
          { status: 400 }
        );
      }
  
      // Create the blog directly using authorId
      const blog = await prisma.blog.create({
        data: {
          title,
          body: blogBody,
          image,
          authorId: authorId, // Use the provided user ID directly
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
  
      return NextResponse.json(blog, { status: 201 });
    } catch (error) {
      console.error('Error creating blog:', error);
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  }