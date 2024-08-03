import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function PATCH(request: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  const { id, role } = await request.json();
  if (!id) {
    return NextResponse.json({ error: "Missing required id" }, { status: 400 });
  }

  const userUpdate = await prisma.user.update({
    where: { id },
    data: { role },
  });

  return NextResponse.json(userUpdate);
}
