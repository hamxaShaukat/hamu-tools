import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Not Authenticated" }, { status: 401 });
  }

  const { id, title, logo, bio, url, description, category, price } =
    await request.json();

  const updateTool = await prisma?.tool.update({
    where: { id },
    data: {
      title,
      logo,
      bio,
      url,
      description,
      category,
      price,
    },
  });
console.log(updateTool)
  return NextResponse.json(updateTool)
}
