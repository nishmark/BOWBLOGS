import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/users - Retrieve all users or a specific user by email
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (email) {
      // Get specific user by email
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        );
      }

      return NextResponse.json(user);
    } else {
      // Get all users
      const users = await prisma.user.findMany({
        orderBy: { createdAt: 'desc' },
      });

      return NextResponse.json(users);
    }
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/users - Create or update a user
export async function POST(request) {
  try {
    const body = await request.json();
    const { email, name, image } = body;

    // Validate required fields
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Use upsert to create or update user
    const user = await prisma.user.upsert({
      where: { email },
      update: {
        name: name || undefined,
        image: image || undefined,
        updatedAt: new Date(),
      },
      create: {
        email,
        name,
        image,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error('Error saving user:', error);
    
    // Handle Prisma unique constraint violation
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
