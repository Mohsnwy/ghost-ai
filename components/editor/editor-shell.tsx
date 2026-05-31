"use client"

import { useState } from "react";
import { Plus } from "lucide-react";

import { EditorNavbar } from "@/components/editor/editor-navbar";
import { ProjectSidebar } from "@/components/editor/project-sidebar";
import { ProjectDialogs } from "@/components/editor/project-dialogs";
import { useProjectActions, type Project } from "@/hooks/use-project-actions";
import { Button } from "@/components/ui/button";

type EditorShellProps = {
  ownedProjects: Project[];
  sharedProjects: Project[];
  activeProject?: Project;
};

function EditorShell({
  activeProject,
  ownedProjects,
  sharedProjects,
}: EditorShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const projectActions = useProjectActions(ownedProjects, sharedProjects);

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
        onCreateProject={projectActions.openCreateDialog}
        onClose={() => setIsSidebarOpen(false)}
        onDeleteProject={projectActions.openDeleteDialog}
        onOpenProject={projectActions.openProject}
        onRenameProject={projectActions.openRenameDialog}
        ownedProjects={projectActions.ownedProjects}
        sharedProjects={projectActions.sharedProjects}
      />
      <main className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center px-6 text-center">
        {activeProject ? (
          <div className="max-w-4xl space-y-6 text-left">
            <div className="rounded-3xl border border-border bg-card/70 p-8 shadow-soft">
              <h1 className="text-3xl font-semibold tracking-normal text-foreground">
                {activeProject.name}
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Project ID: {activeProject.id}
              </p>
            </div>
            <div className="rounded-3xl border border-border bg-background/80 p-8 text-sm leading-7 text-foreground">
              <p className="text-muted-foreground">This workspace is connected to the selected project.</p>
              <p className="mt-4 text-foreground">Use the sidebar to rename, delete, or open another project.</p>
            </div>
          </div>
        ) : (
          <div className="max-w-lg space-y-5">
            <div className="space-y-3">
              <h1 className="text-2xl font-semibold tracking-normal text-foreground">
                Create a project or open an existing one
              </h1>
              <p className="text-sm leading-6 text-muted-foreground">
                Start a new architecture workspace, or choose a project from the sidebar.
              </p>
            </div>
            <Button onClick={projectActions.openCreateDialog} type="button">
              <Plus className="size-4" />
              New Project
            </Button>
          </div>
        )}
      </main>
      <ProjectDialogs
        dialog={projectActions.dialog}
        isLoading={projectActions.isLoading}
        onClose={projectActions.closeDialog}
        onProjectNameChange={projectActions.onProjectNameChange}
        onSubmitDelete={projectActions.submitDeleteProject}
        onSubmitProjectForm={projectActions.submitProjectForm}
        projectName={projectActions.projectName}
        slugPreview={projectActions.slugPreview}
      />
    </div>
  );
}

export { EditorShell };
