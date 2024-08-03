import { NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';
import { auth } from '@/auth';

export async function GET() {
  const session = await auth();

  if (!session || !session?.user.email) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const currentUserEmail = session?.user.email;

  try {
    const users = await prisma.user.findMany({
      where: {
        role: false,
        email: {
          not: currentUserEmail,
        },
      },
      include: {
        tools: true,
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users with role false' }, { status: 500 });
  }
}
