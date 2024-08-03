import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prismadb";

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const email = session?.user.email;
  console.log(email)
  if (!email) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const userTools = await prisma.tool.findMany({
      where: { userEmail: email },
    });
    return NextResponse.json(userTools);
  } catch (error) {
    console.error("Error fetching user tools:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching tools" },
      { status: 500 }
    );
  }
}
