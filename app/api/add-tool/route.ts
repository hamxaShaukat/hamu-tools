import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prismadb";
import { Prisma } from "@prisma/client";

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { title, logo, bio, url, description, category, price } = await request.json();

  if (!title || !url || !description || !category) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const userEmail = session.user?.email;
  console.log(userEmail)

  if (!userEmail) {
    return NextResponse.json({ error: "User ID is missing" }, { status: 400 });
  }
  console.log(title,bio,url,description,price,category)

  try {
    const tool = await prisma.tool.create({
      data: {
        title,
        logo,
        bio,
        url,
        description,
        category,
        price,
        userEmail,
      },
    });

    return NextResponse.json(tool);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') { // Prisma unique constraint violation
        return NextResponse.json(
          { error: "A tool with this title already exists" },
          { status: 400 }
        );
      }
    }
    console.error("Failed to create tool:", error); 
    return NextResponse.json(
      { error: "Failed to create tool due to an unexpected error" },
      { status: 500 }
    );
  }
}
