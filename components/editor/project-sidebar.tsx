"use client"

import { Pencil, Plus, Trash2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Project } from "@/hooks/use-project-actions";
import { cn } from "@/lib/utils";

type ProjectSidebarProps = {
  isOpen: boolean;
  ownedProjects: Project[];
  sharedProjects: Project[];
  onClose?: () => void;
  onCreateProject?: () => void;
  onDeleteProject?: (project: Project) => void;
  onOpenProject?: (project: Project) => void;
  onRenameProject?: (project: Project) => void;
  className?: string;
};

function EmptyProjectsState() {
  return (
    <div className="flex min-h-40 items-center justify-center rounded-lg border border-dashed border-border bg-card/40 px-4 text-center text-sm text-muted-foreground">
      No projects yet
    </div>
  )
}

function ProjectList({
  projects,
  showActions,
  onDeleteProject,
  onOpenProject,
  onRenameProject,
}: {
  projects: Project[];
  showActions: boolean;
  onDeleteProject?: (project: Project) => void;
  onOpenProject?: (project: Project) => void;
  onRenameProject?: (project: Project) => void;
}) {
  if (projects.length === 0) {
    return <EmptyProjectsState />;
  }

  return (
    <div className="space-y-2">
      {projects.map((project) => (
        <div
          key={project.id}
          role="button"
          tabIndex={0}
          onClick={() => onOpenProject?.(project)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              onOpenProject?.(project);
            }
          }}
          className="group flex min-h-12 items-center gap-2 rounded-lg border border-border bg-background/40 px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-foreground">
              {project.name}
            </p>
            <p className="truncate font-mono text-xs text-muted-foreground">
              {project.id}
            </p>
          </div>

          {showActions && (
            <div className="flex shrink-0 items-center gap-1 opacity-100 sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100 sm:group-focus-within:opacity-100">
              <Button
                aria-label={`Rename ${project.name}`}
                onClick={(event) => {
                  event.stopPropagation();
                  onRenameProject?.(project);
                }}
                size="icon-xs"
                type="button"
                variant="ghost"
              >
                <Pencil className="size-3.5" />
              </Button>
              <Button
                aria-label={`Delete ${project.name}`}
                onClick={(event) => {
                  event.stopPropagation();
                  onDeleteProject?.(project);
                }}
                size="icon-xs"
                type="button"
                variant="ghost"
              >
                <Trash2 className="size-3.5 text-destructive" />
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function ProjectSidebar({
  isOpen,
  ownedProjects,
  sharedProjects,
  onClose,
  onCreateProject,
  onDeleteProject,
  onOpenProject,
  onRenameProject,
  className,
}: ProjectSidebarProps) {
  return (
    <aside
      aria-hidden={!isOpen}
      className={cn(
        "fixed left-3 top-17 z-40 flex h-[calc(100vh-5rem)] w-80 flex-col rounded-xl border border-border bg-card text-card-foreground shadow-soft transition-transform duration-200 ease-out",
        isOpen ? "translate-x-0" : "-translate-x-[calc(100%+1.5rem)]",
        className
      )}
    >
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-border px-4">
        <h2 className="text-sm font-medium text-foreground">projects</h2>
        <Button
          aria-label="Close project sidebar"
          onClick={onClose}
          size="icon-sm"
          type="button"
          variant="ghost"
        >
          <X className="size-4" />
        </Button>
      </div>

      <Tabs
        className="min-h-0 flex-1 gap-3 p-4"
        defaultValue="my-projects"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="my-projects">My Projects</TabsTrigger>
          <TabsTrigger value="shared">shared</TabsTrigger>
        </TabsList>
        <TabsContent className="mt-0 min-h-0" value="my-projects">
          <ProjectList
            onDeleteProject={onDeleteProject}
            onOpenProject={onOpenProject}
            onRenameProject={onRenameProject}
            projects={ownedProjects}
            showActions
          />
        </TabsContent>
        <TabsContent className="mt-0 min-h-0" value="shared">
          <ProjectList
            onOpenProject={onOpenProject}
            projects={sharedProjects}
            showActions={false}
          />
        </TabsContent>
      </Tabs>

      <div className="border-t border-border p-4">
        <Button className="w-full" onClick={onCreateProject} type="button">
          <Plus className="size-4" />
          New Project
        </Button>
      </div>
    </aside>
  )
}

export { ProjectSidebar }
export type { ProjectSidebarProps }
