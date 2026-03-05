"use client"

import { Zap } from "lucide-react"

export function Header() {
  return (
    <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-4 py-4 md:px-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center rounded-lg bg-primary/15 p-2">
            <Zap className="size-5 text-primary" />
          </div>
          <div>
            <h1 className="font-mono text-lg font-bold tracking-tight text-foreground">
              Sense
            </h1>
            <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
              Training Planner Pro
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 md:flex">
            <span className="size-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-medium text-primary">Activo</span>
          </div>
        </div>
      </div>
    </header>
  )
}
