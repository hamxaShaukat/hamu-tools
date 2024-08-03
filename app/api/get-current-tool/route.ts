import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prismadb";

export async function POST(request: NextRequest) {
  
  const { selectedTool } = await request.json();
  console.log(selectedTool)

  try {
    const userTool = await prisma.tool.findUnique({
      where: { title: selectedTool },
    });
    return NextResponse.json(userTool);
  } catch (error) {
    console.error("Error fetching user tools:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching tools" },
      { status: 500 }
    );
  }
}
