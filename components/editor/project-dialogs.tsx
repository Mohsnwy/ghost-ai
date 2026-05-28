"use client"

import type { FormEvent } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

import type { ProjectDialogState } from "@/components/editor/use-project-dialogs"

type ProjectDialogsProps = {
  dialog: ProjectDialogState
  isLoading: boolean
  onClose: () => void
  onProjectNameChange: (value: string) => void
  onSubmitDelete: () => void
  onSubmitProjectForm: () => void
  projectName: string
  slugPreview: string
}

function ProjectDialogs({
  dialog,
  isLoading,
  onClose,
  onProjectNameChange,
  onSubmitDelete,
  onSubmitProjectForm,
  projectName,
  slugPreview,
}: ProjectDialogsProps) {
  const isOpen = dialog !== null

  function handleProjectFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSubmitProjectForm()
  }

  function handleDeleteSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSubmitDelete()
  }

  return (
    <Dialog onOpenChange={(open) => !open && onClose()} open={isOpen}>
      {dialog?.type === "create" && (
        <DialogContent>
          <form className="grid gap-4" onSubmit={handleProjectFormSubmit}>
            <DialogHeader>
              <DialogTitle>Create Project</DialogTitle>
              <DialogDescription>
                Name a new architecture workspace.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-2">
              <label className="text-sm font-medium text-foreground" htmlFor="project-name">
                Project name
              </label>
              <Input
                autoFocus
                id="project-name"
                onChange={(event) => onProjectNameChange(event.target.value)}
                placeholder="Design System Map"
                value={projectName}
              />
              <p className="text-xs text-muted-foreground">
                Slug preview:{" "}
                <span className="font-mono text-foreground">{slugPreview}</span>
              </p>
            </div>

            <DialogFooter>
              <Button disabled={isLoading} type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button disabled={isLoading} type="submit">
                {isLoading ? "Creating..." : "Create Project"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      )}

      {dialog?.type === "rename" && dialog.project && (
        <DialogContent>
          <form className="grid gap-4" onSubmit={handleProjectFormSubmit}>
            <DialogHeader>
              <DialogTitle>Rename Project</DialogTitle>
              <DialogDescription>
                Current project name: {dialog.project.name}
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-2">
              <label className="text-sm font-medium text-foreground" htmlFor="rename-project-name">
                Project name
              </label>
              <Input
                autoFocus
                id="rename-project-name"
                onChange={(event) => onProjectNameChange(event.target.value)}
                value={projectName}
              />
            </div>

            <DialogFooter>
              <Button disabled={isLoading} type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button disabled={isLoading} type="submit">
                {isLoading ? "Saving..." : "Save Name"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      )}

      {dialog?.type === "delete" && dialog.project && (
        <DialogContent>
          <form className="grid gap-4" onSubmit={handleDeleteSubmit}>
            <DialogHeader>
              <DialogTitle>Delete Project</DialogTitle>
              <DialogDescription>
                This will delete {dialog.project.name}. This action cannot be undone.
              </DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <Button disabled={isLoading} type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button disabled={isLoading} type="submit" variant="destructive">
                {isLoading ? "Deleting..." : "Delete Project"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      )}
    </Dialog>
  )
}

export { ProjectDialogs }
