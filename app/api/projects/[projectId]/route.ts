import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function PATCH(
  request: Request,
  { params }: any
) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // `params` is a Promise-like object in Next.js dynamic route handlers.
  // Await it before reading `projectId` to avoid runtime errors.
  const resolvedParams = await params;
  const { projectId } = resolvedParams as { projectId?: string };

  // Debug: show raw params and projectId value
  try {
    // eslint-disable-next-line no-console
    console.debug("PATCH params:", { params: resolvedParams, projectId, typeof_projectId: typeof projectId });
  } catch (e) {
    /* ignore */
  }

  if (!projectId) {
    return NextResponse.json({ message: "Missing projectId" }, { status: 400 });
  }

  const p: any = prisma;
  const project = await p.project.findUnique({ where: { id: projectId } });
  // Debug: log auth + project owner to help diagnose client-side failures
  try {
    // eslint-disable-next-line no-console
    console.debug("PATCH /api/projects/", { projectId, userId, ownerId: project?.ownerId });
  } catch (e) {
    /* ignore */
  }
  if (!project) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  if (project.ownerId !== userId) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  let body: any = {};
  try {
    body = await request.json();
  } catch (e) {
    // ignore
  }

  const name = body?.name?.trim();
  if (!name) {
    return NextResponse.json({ message: "Invalid name" }, { status: 400 });
  }

  const updated = await p.project.update({
    where: { id: projectId },
    data: { name },
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  _request: Request,
  { params }: any
) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // `params` is a Promise-like object in Next.js dynamic route handlers.
  // Await it before reading `projectId` to avoid runtime errors.
  const resolvedParams = await params;
  const { projectId } = resolvedParams as { projectId?: string };

  // Debug: show raw params and projectId value
  try {
    // eslint-disable-next-line no-console
    console.debug("DELETE params:", { params: resolvedParams, projectId, typeof_projectId: typeof projectId });
  } catch (e) {
    /* ignore */
  }

  if (!projectId) {
    return NextResponse.json({ message: "Missing projectId" }, { status: 400 });
  }

  const p: any = prisma;
  const project = await p.project.findUnique({ where: { id: projectId } });
  // Debug: log auth + project owner to help diagnose client-side failures
  try {
    // eslint-disable-next-line no-console
    console.debug("DELETE /api/projects/", { projectId, userId, ownerId: project?.ownerId });
  } catch (e) {
    /* ignore */
  }
  if (!project) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  if (project.ownerId !== userId) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  await p.project.delete({ where: { id: projectId } });

  return NextResponse.json({ ok: true });
}
