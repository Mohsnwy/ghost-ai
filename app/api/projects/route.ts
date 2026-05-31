import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const p: any = prisma;
  const projects = await p.project.findMany({
    where: { ownerId: userId },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  let body: any = {};
  try {
    body = await request.json();
  } catch (e) {
    // ignore, treat as empty
  }

  const name = body?.name?.trim() || "Untitled Project";

  const p: any = prisma;
  const project = await p.project.create({
    data: {
      name,
      ownerId: userId,
    },
  });

  return NextResponse.json(project, { status: 201 });
}
