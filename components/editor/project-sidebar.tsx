"use client"

import { Plus, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

type ProjectSidebarProps = {
  isOpen: boolean
  onClose?: () => void
  className?: string
}

function EmptyProjectsState() {
  return (
    <div className="flex min-h-40 items-center justify-center rounded-lg border border-dashed border-border bg-card/40 px-4 text-center text-sm text-muted-foreground">
      No projects yet
    </div>
  )
}

function ProjectSidebar({ isOpen, onClose, className }: ProjectSidebarProps) {
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
          <EmptyProjectsState />
        </TabsContent>
        <TabsContent className="mt-0 min-h-0" value="shared">
          <EmptyProjectsState />
        </TabsContent>
      </Tabs>

      <div className="border-t border-border p-4">
        <Button className="w-full" type="button">
          <Plus className="size-4" />
          New Project
        </Button>
      </div>
    </aside>
  )
}

export { ProjectSidebar }
export type { ProjectSidebarProps }
