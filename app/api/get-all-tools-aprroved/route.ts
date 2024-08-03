import { NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';

export async function GET() {
  try {
    const tools = await prisma.tool.findMany({
      where: {
        approved: 'approved',
      },
      include: {
        User: true,
        Reviews: true,
      },
    });

    return NextResponse.json(tools);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch tools' }, { status: 500 });
  }
}
