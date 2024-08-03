import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prismadb";
import { Prisma } from "@prisma/client";

export async function POST(request: NextRequest) {
  const { email } = await request.json();

  if (!email) {
    return NextResponse.json(
      { error: "Kindly Provide email" },
      { status: 400 }
    );
  }

  try {
    const tool = await prisma.newsletter.create({
      data: {
        email,
      },
    });

    return NextResponse.json(tool);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        // Prisma unique constraint violation
        return NextResponse.json(
          { error: "This email already exists" },
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
