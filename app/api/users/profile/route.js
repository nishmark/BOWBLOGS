import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/users/profile - Get comprehensive user profile data
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userEmail = searchParams.get('email');

    if (!userEmail) {
      return NextResponse.json(
        { error: 'User email is required' },
        { status: 400 }
      );
    }

    // Find user by email with all their blogs
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
      include: {
        blogs: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Calculate blog statistics
    const totalBlogs = user.blogs.length;
    const publishedBlogs = user.blogs.filter(blog => blog.isPublished).length;
    const draftBlogs = user.blogs.filter(blog => !blog.isPublished).length;
    
    // Get the most recent blog
    const latestBlog = user.blogs.length > 0 ? user.blogs[0] : null;
    
    // Calculate total views (placeholder - you can implement actual view tracking later)
    const totalViews = 0; // This would be calculated from a views table
    
    // Format dates
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    };

    // Prepare the response
    const profileData = {
      user: {
        id: user.id,
        email: user.email,
        name: user.name || 'Unknown',
        image: user.image || 'https://via.placeholder.com/150x150/cccccc/666666?text=User',
        createdAt: formatDate(user.createdAt),
        updatedAt: formatDate(user.updatedAt),
        memberSince: formatDate(user.createdAt),
        lastActive: formatDate(user.updatedAt),
      },
      statistics: {
        totalBlogs,
        publishedBlogs,
        draftBlogs,
        totalViews,
        completionRate: totalBlogs > 0 ? Math.round((publishedBlogs / totalBlogs) * 100) : 0,
      },
      recentActivity: {
        latestBlog: latestBlog ? {
          id: latestBlog.id,
          title: latestBlog.title,
          isPublished: latestBlog.isPublished,
          createdAt: formatDate(latestBlog.createdAt),
          updatedAt: formatDate(latestBlog.updatedAt),
        } : null,
        lastUpdated: latestBlog ? formatDate(latestBlog.updatedAt) : 'No blogs yet',
      },
      allBlogs: user.blogs.map(blog => ({
        id: blog.id,
        title: blog.title,
        isPublished: blog.isPublished,
        createdAt: formatDate(blog.createdAt),
        updatedAt: formatDate(blog.updatedAt),
        image: blog.image,
      })),
    };

    return NextResponse.json(profileData);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 