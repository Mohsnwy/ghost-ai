import type { ComponentType, ReactNode } from "react"
import { FileText, Network, Sparkles } from "lucide-react"

type AuthPanelProps = {
  children: ReactNode
  mode: "sign-in" | "sign-up"
}

type Feature = {
  description: string
  icon: ComponentType<{ className?: string }>
  title: string
}

const authCopy = {
  "sign-in": {
    copyright: "(c) 2026 Ghost AI. All rights reserved.",
    heading: "Design systems at the speed of thought.",
    tagline:
      "Describe your architecture in plain English. Ghost AI maps it to a shared canvas your whole team can refine in real time.",
    features: [
      {
        description: "Describe your system, AI maps it to nodes and edges on a live canvas.",
        icon: Sparkles,
        title: "AI Architecture Generation",
      },
      {
        description: "Live cursors, presence indicators, and shared node editing across your team.",
        icon: Network,
        title: "Real-time Collaboration",
      },
      {
        description: "Export a complete Markdown technical spec directly from the canvas graph.",
        icon: FileText,
        title: "Instant Spec Generation",
      },
    ] satisfies Feature[],
  },
  "sign-up": {
    copyright: "(c) 2026 Ghost AI. All rights reserved.",
    heading: "Shape complex systems before the details drift.",
    tagline:
      "Create a secure workspace for architecture diagrams, AI-generated specs, and collaborative project planning.",
    features: [
      {
        description: "Move from prompt to structured architecture canvas without setup friction.",
        icon: Sparkles,
        title: "AI Architecture Generation",
      },
      {
        description: "Invite collaborators into the same protected editor workspace.",
        icon: Network,
        title: "Private Collaboration",
      },
      {
        description: "Keep implementation notes and generated specs attached to the system model.",
        icon: FileText,
        title: "Spec-Ready Projects",
      },
    ] satisfies Feature[],
  },
}

function AuthPanel({ children, mode }: AuthPanelProps) {
  const copy = authCopy[mode]

  return (
    <main className="grid min-h-screen bg-background font-sans text-foreground lg:grid-cols-2">
      <section className="hidden min-h-screen border-r border-border bg-[var(--auth-panel)] px-10 py-9 lg:flex lg:flex-col xl:px-16">
        <div className="flex items-center gap-3 text-sm font-semibold text-foreground">
          <span className="grid size-9 place-items-center rounded-md bg-primary shadow-soft">
            <span className="size-3 rounded-[0.2rem] bg-primary-foreground" />
          </span>
          <span>Ghost AI</span>
        </div>

        <div className="my-auto max-w-[38rem] space-y-14">
          <div className="max-w-[34rem] space-y-5">
            <h1 className="text-4xl font-semibold leading-tight tracking-normal text-foreground xl:text-5xl">
              {copy.heading}
            </h1>
            <p className="text-base leading-7 text-[var(--auth-panel-muted)] xl:text-lg">
              {copy.tagline}
            </p>
          </div>

          <ul className="space-y-8">
            {copy.features.map((feature) => {
              const Icon = feature.icon

              return (
                <li className="flex gap-5" key={feature.title}>
                  <span className="grid size-8 shrink-0 place-items-center rounded-md border border-primary/35 bg-primary/15 text-primary">
                    <Icon className="size-4" />
                  </span>
                  <span className="space-y-1.5">
                    <span className="block text-base font-semibold text-foreground">
                      {feature.title}
                    </span>
                    <span className="block max-w-[35rem] text-sm leading-6 text-[var(--auth-panel-muted)]">
                      {feature.description}
                    </span>
                  </span>
                </li>
              )
            })}
          </ul>
        </div>

        <p className="text-sm text-[var(--auth-panel-subtle)]">
          {copy.copyright}
        </p>
      </section>

      <section className="flex min-h-screen items-center justify-center bg-[var(--auth-form-bg)] px-4 py-8 sm:px-8">
        <div className="w-full max-w-[25rem] lg:max-w-[30rem]">
          <div className="mb-8 flex items-center justify-center gap-3 lg:hidden">
            <span className="grid size-9 place-items-center rounded-md bg-primary shadow-soft">
              <span className="size-3 rounded-[0.2rem] bg-primary-foreground" />
            </span>
            <span className="text-sm font-semibold text-foreground">Ghost AI</span>
          </div>

          {children}
        </div>
      </section>
    </main>
  )
}

export { AuthPanel }
