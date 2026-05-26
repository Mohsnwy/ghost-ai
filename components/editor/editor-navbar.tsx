"use client"

import { UserButton } from "@clerk/nextjs"
import { PanelLeftClose, PanelLeftOpen } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type EditorNavbarProps = {
  isSidebarOpen: boolean
  onSidebarToggle?: () => void
  className?: string
}

function EditorNavbar({
  isSidebarOpen,
  onSidebarToggle,
  className,
}: EditorNavbarProps) {
  const SidebarIcon = isSidebarOpen ? PanelLeftClose : PanelLeftOpen

  return (
    <header
      className={cn(
        "flex h-14 shrink-0 items-center border-b border-border bg-background px-3",
        className
      )}
    >
      <div className="flex min-w-0 flex-1 items-center justify-start">
        <Button
          aria-label={isSidebarOpen ? "Close project sidebar" : "Open project sidebar"}
          aria-pressed={isSidebarOpen}
          onClick={onSidebarToggle}
          size="icon"
          type="button"
          variant="ghost"
        >
          <SidebarIcon className="size-4" />
        </Button>
      </div>

      <div className="flex min-w-0 flex-1 items-center justify-center" />

      <div className="flex min-w-0 flex-1 items-center justify-end">
        <UserButton />
      </div>
    </header>
  )
}

export { EditorNavbar }
export type { EditorNavbarProps }
