import { NextResponse, NextRequest } from 'next/server';
import { auth } from '@/auth';
import prisma from '@/lib/prismadb';

export async function PATCH(request: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const { id, approved } = await request.json();

  if (!id) {
    return NextResponse.json({ error: 'Tool ID is required' }, { status: 400 });
  }

  try {
    const updatedTool = await prisma.tool.update({
      where: { id },
      data: { approved },
    });

    return NextResponse.json(updatedTool);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update approval flag' }, { status: 500 });
  }
}
