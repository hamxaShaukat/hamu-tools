import { NextResponse, NextRequest } from 'next/server';
import { auth } from '@/auth';
import prisma from '@/lib/prismadb';

export async function DELETE(request: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }
  try {
    await prisma.user.delete({
      where: { email:session?.user.email },
    });

    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Failed to delete tool' }, { status: 500 });
  }
}
