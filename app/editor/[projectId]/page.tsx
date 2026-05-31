import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import { EditorShell } from "@/components/editor/editor-shell";
import { getProjectById, getProjectsForUser } from "@/lib/projects";

type EditorProjectPageProps = {
  params: {
    projectId: string;
  };
};

export default async function EditorProjectPage({ params }: EditorProjectPageProps) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const { ownedProjects, sharedProjects } = await getProjectsForUser(userId);
  const activeProject = await getProjectById(params.projectId, userId);

  if (!activeProject) {
    notFound();
  }

  return (
    <EditorShell
      activeProject={activeProject}
      ownedProjects={ownedProjects}
      sharedProjects={sharedProjects}
    />
  );
}
