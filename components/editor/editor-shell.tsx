"use client"

import { useState } from "react"

import { EditorNavbar } from "@/components/editor/editor-navbar"
import { ProjectSidebar } from "@/components/editor/project-sidebar"

function EditorShell() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <EditorNavbar
        isSidebarOpen={isSidebarOpen}
        onSidebarToggle={() => setIsSidebarOpen((isOpen) => !isOpen)}
      />
      <ProjectSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <main className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center px-6 text-sm text-muted-foreground">
        Editor workspace
      </main>
    </div>
  )
}

export { EditorShell }
