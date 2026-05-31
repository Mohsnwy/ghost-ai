import { clerkClient } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

type ProjectRow = {
  id: string;
  ownerId: string;
  name: string;
  description: string | null;
  status: "DRAFT" | "ARCHIVED";
  createdAt: Date;
  updatedAt: Date;
};

type Project = {
  id: string;
  ownerId: string;
  name: string;
  description: string | null;
  status: "DRAFT" | "ARCHIVED";
  createdAt: string;
  updatedAt: string;
};

function normalizeProject(project: ProjectRow): Project {
  return {
    ...project,
    createdAt: project.createdAt.toISOString(),
    updatedAt: project.updatedAt.toISOString(),
  };
}

async function getUserPrimaryEmail(userId: string) {
  try {
    const clerk = await clerkClient();
    const user = await clerk.users.getUser(userId);
    return user.emailAddresses?.[0]?.emailAddress ?? null;
  } catch {
    return null;
  }
}

export async function getProjectsForUser(userId: string) {
  const p: any = prisma;
  const ownedProjects = await p.project.findMany({
    where: { ownerId: userId },
    orderBy: { createdAt: "desc" },
  });

  const email = await getUserPrimaryEmail(userId);
  const sharedProjects =
    email !== null
      ? await p.project.findMany({
          where: {
            collaborators: {
              some: {
                collaboratorEmail: email,
              },
            },
          },
          orderBy: { createdAt: "desc" },
        })
      : [];

  return {
    ownedProjects: ownedProjects.map(normalizeProject),
    sharedProjects: (sharedProjects as ProjectRow[])
      .filter((project) => project.ownerId !== userId)
      .map(normalizeProject),
  };
}

export async function getProjectById(projectId: string, userId: string) {
  const p: any = prisma;
  const project: any = await p.project.findUnique({
    where: { id: projectId },
    include: { collaborators: true },
  });

  if (!project) {
    return null;
  }

  if (project.ownerId === userId) {
    return normalizeProject(project);
  }

  const email = await getUserPrimaryEmail(userId);
  if (!email) {
    return null;
  }

  const isCollaborator = project.collaborators.some(
    (collaborator: any) => collaborator.collaboratorEmail === email
  );

  if (!isCollaborator) {
    return null;
  }

  return normalizeProject(project);
}

export type { Project };
