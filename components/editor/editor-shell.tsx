"use client"

import { useState } from "react"
import { Plus } from "lucide-react"

import { EditorNavbar } from "@/components/editor/editor-navbar"
import { ProjectSidebar } from "@/components/editor/project-sidebar"
import { ProjectDialogs } from "@/components/editor/project-dialogs"
import { useProjectDialogs } from "@/components/editor/use-project-dialogs"
import { Button } from "@/components/ui/button"

function EditorShell() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const projectDialogs = useProjectDialogs()

  return (
    <div className="min-h-screen bg-background text-foreground">
      <EditorNavbar
        isSidebarOpen={isSidebarOpen}
        onSidebarToggle={() => setIsSidebarOpen((isOpen) => !isOpen)}
      />
      {isSidebarOpen && (
        <button
          aria-label="Close project sidebar"
          className="fixed inset-0 z-30 bg-background/70 backdrop-blur-xs lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
          type="button"
        />
      )}
      <ProjectSidebar
        isOpen={isSidebarOpen}
        onCreateProject={projectDialogs.openCreateDialog}
        onClose={() => setIsSidebarOpen(false)}
        onDeleteProject={projectDialogs.openDeleteDialog}
        onRenameProject={projectDialogs.openRenameDialog}
        ownedProjects={projectDialogs.ownedProjects}
        sharedProjects={projectDialogs.sharedProjects}
      />
      <main className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center px-6 text-center">
        <div className="max-w-lg space-y-5">
          <div className="space-y-3">
            <h1 className="text-2xl font-semibold tracking-normal text-foreground">
              Create a project or open an existing one
            </h1>
            <p className="text-sm leading-6 text-muted-foreground">
              Start a new architecture workspace, or choose a project from the sidebar.
            </p>
          </div>
          <Button onClick={projectDialogs.openCreateDialog} type="button">
            <Plus className="size-4" />
            New Project
          </Button>
        </div>
      </main>
      <ProjectDialogs
        dialog={projectDialogs.dialog}
        isLoading={projectDialogs.isLoading}
        onClose={projectDialogs.closeDialog}
        onProjectNameChange={projectDialogs.onProjectNameChange}
        onSubmitDelete={projectDialogs.submitDeleteProject}
        onSubmitProjectForm={projectDialogs.submitProjectForm}
        projectName={projectDialogs.projectName}
        slugPreview={projectDialogs.slugPreview}
      />
    </div>
  )
}

export { EditorShell }
