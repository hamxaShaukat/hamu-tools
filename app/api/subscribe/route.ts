import { NextResponse, NextRequest } from 'next/server';
import { auth } from '@/auth';
import prisma from '@/lib/prismadb';

export async function PATCH(request: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const { subscribed } = await request.json();

  if (typeof subscribed !== 'boolean') {
    return NextResponse.json({ error: 'Invalid subscription flag' }, { status: 400 });
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { email: session.user?.email as string },
      data: { subscribed },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update subscription flag' }, { status: 500 });
  }
}
