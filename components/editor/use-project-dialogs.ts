"use client"

import { useMemo, useState } from "react"

type MockProject = {
  access: "owned" | "shared"
  id: string
  name: string
  slug: string
}

type ProjectDialogType = "create" | "rename" | "delete"

type ProjectDialogState = {
  project?: MockProject
  type: ProjectDialogType
} | null

const mockProjects: MockProject[] = [
  {
    access: "owned",
    id: "project-1",
    name: "Design System Map",
    slug: "design-system-map",
  },
  {
    access: "owned",
    id: "project-2",
    name: "Commerce Platform",
    slug: "commerce-platform",
  },
  {
    access: "shared",
    id: "project-3",
    name: "Partner API Review",
    slug: "partner-api-review",
  },
]

function toSlug(value: string) {
  return (
    value
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "untitled-project"
  )
}

function useProjectDialogs() {
  const [projects, setProjects] = useState<MockProject[]>(mockProjects)
  const [dialog, setDialog] = useState<ProjectDialogState>(null)
  const [projectName, setProjectName] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const ownedProjects = useMemo(
    () => projects.filter((project) => project.access === "owned"),
    [projects]
  )
  const sharedProjects = useMemo(
    () => projects.filter((project) => project.access === "shared"),
    [projects]
  )
  const slugPreview = useMemo(() => toSlug(projectName), [projectName])

  function openCreateDialog() {
    setProjectName("")
    setDialog({ type: "create" })
  }

  function openRenameDialog(project: MockProject) {
    setProjectName(project.name)
    setDialog({ project, type: "rename" })
  }

  function openDeleteDialog(project: MockProject) {
    setProjectName(project.name)
    setDialog({ project, type: "delete" })
  }

  function closeDialog() {
    if (isLoading) {
      return
    }

    setDialog(null)
    setProjectName("")
  }

  function completeMockSubmit(updateProjects: () => void) {
    setIsLoading(true)

    window.setTimeout(() => {
      updateProjects()
      setIsLoading(false)
      setDialog(null)
      setProjectName("")
    }, 250)
  }

  function submitProjectForm() {
    const activeDialog = dialog
    const name = projectName.trim() || "Untitled Project"
    const slug = toSlug(name)

    if (activeDialog?.type === "create") {
      completeMockSubmit(() => {
        setProjects((currentProjects) => [
          {
            access: "owned",
            id: `project-${crypto.randomUUID()}`,
            name,
            slug,
          },
          ...currentProjects,
        ])
      })
      return
    }

    if (activeDialog?.type === "rename" && activeDialog.project) {
      completeMockSubmit(() => {
        setProjects((currentProjects) =>
          currentProjects.map((project) =>
            project.id === activeDialog.project?.id
              ? {
                  ...project,
                  name,
                  slug,
                }
              : project
          )
        )
      })
    }
  }

  function submitDeleteProject() {
    const activeDialog = dialog

    if (activeDialog?.type !== "delete" || !activeDialog.project) {
      return
    }

    completeMockSubmit(() => {
      setProjects((currentProjects) =>
        currentProjects.filter((project) => project.id !== activeDialog.project?.id)
      )
    })
  }

  return {
    closeDialog,
    dialog,
    isLoading,
    onProjectNameChange: setProjectName,
    openCreateDialog,
    openDeleteDialog,
    openRenameDialog,
    ownedProjects,
    projectName,
    sharedProjects,
    slugPreview,
    submitDeleteProject,
    submitProjectForm,
  }
}

export { useProjectDialogs }
export type { MockProject, ProjectDialogState }
