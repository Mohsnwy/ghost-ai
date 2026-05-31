"use client"

import { useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export type Project = {
  id: string;
  ownerId: string;
  name: string;
  description: string | null;
  status: "DRAFT" | "ARCHIVED";
  createdAt: string;
  updatedAt: string;
};

type ProjectDialogType = "create" | "rename" | "delete";

export type ProjectDialogState =
  | {
      type: ProjectDialogType;
      project?: Project;
    }
  | null;

function toSlug(value: string) {
  return (
    value
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "untitled-project"
  );
}

function useProjectActions(
  initialOwnedProjects: Project[],
  initialSharedProjects: Project[]
) {
  const [ownedProjects, setOwnedProjects] = useState<Project[]>(
    initialOwnedProjects
  );
  const [sharedProjects, setSharedProjects] = useState<Project[]>(
    initialSharedProjects
  );
  const [dialog, setDialog] = useState<ProjectDialogState>(null);
  const [projectName, setProjectName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const pathname = usePathname();

  const activeProjectId = useMemo(() => {
    if (!pathname?.startsWith("/editor/")) {
      return null;
    }

    const segments = pathname.split("/");
    return segments.length >= 3 ? segments[2] : null;
  }, [pathname]);

  const slugPreview = useMemo(() => toSlug(projectName), [projectName]);

  function openCreateDialog() {
    setProjectName("");
    setDialog({ type: "create" });
  }

  function openRenameDialog(project: Project) {
    setProjectName(project.name);
    setDialog({ type: "rename", project });
  }

  function openDeleteDialog(project: Project) {
    setProjectName(project.name);
    setDialog({ type: "delete", project });
  }

  function closeDialog() {
    if (isLoading) {
      return;
    }

    setDialog(null);
    setProjectName("");
    setError(null);
  }

  async function submitProjectForm() {
    const activeDialog = dialog;
    const name = projectName.trim() || "Untitled Project";

    if (!activeDialog) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      if (activeDialog.type === "create") {
        const response = await fetch("/api/projects", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, slug: slugPreview }),
        });

        if (!response.ok) {
          throw new Error("Could not create project");
        }

        const project = await response.json();
        setDialog(null);
        setProjectName("");
        router.push(`/editor/${project.id}`);
        return;
      }

      if (activeDialog.type === "rename" && activeDialog.project) {
        const response = await fetch(
          `/api/projects/${activeDialog.project.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name }),
          }
        );

        if (!response.ok) {
          throw new Error("Could not rename project");
        }

        const updated = await response.json();

        setOwnedProjects((currentProjects) =>
          currentProjects.map((project) =>
            project.id === updated.id
              ? { ...project, name: updated.name }
              : project
          )
        );

        setSharedProjects((currentProjects) =>
          currentProjects.map((project) =>
            project.id === updated.id
              ? { ...project, name: updated.name }
              : project
          )
        );

        setDialog(null);
        setProjectName("");
        router.refresh();
      }
    } catch (caught) {
      setError(
        caught instanceof Error ? caught.message : "Something went wrong"
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function submitDeleteProject() {
    const activeDialog = dialog;
    if (!activeDialog?.project) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/projects/${activeDialog.project.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Could not delete project");
      }

      setOwnedProjects((currentProjects) =>
        currentProjects.filter((project) => project.id !== activeDialog.project?.id)
      );
      setSharedProjects((currentProjects) =>
        currentProjects.filter((project) => project.id !== activeDialog.project?.id)
      );

      const deletingActiveWorkspace =
        activeProjectId === activeDialog.project.id;
      setDialog(null);
      setProjectName("");

      if (deletingActiveWorkspace) {
        router.push("/editor");
      } else {
        router.refresh();
      }
    } catch (caught) {
      setError(
        caught instanceof Error ? caught.message : "Something went wrong"
      );
    } finally {
      setIsLoading(false);
    }
  }

  function openProject(project: Project) {
    router.push(`/editor/${project.id}`);
  }

  return {
    closeDialog,
    dialog,
    error,
    isLoading,
    onProjectNameChange: setProjectName,
    openCreateDialog,
    openDeleteDialog,
    openProject,
    openRenameDialog,
    ownedProjects,
    projectName,
    sharedProjects,
    slugPreview,
    submitDeleteProject,
    submitProjectForm,
  };
}

export { useProjectActions };
