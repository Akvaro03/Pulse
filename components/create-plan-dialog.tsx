"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PLAN_COLORS, type PlanColor, type TrainingPlan } from "@/lib/training-store"

export function CreatePlanDialog({
  open,
  onOpenChange,
  onSubmit,
  editingPlan,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: { name: string; description: string; color: PlanColor; icon: string }) => void
  editingPlan?: TrainingPlan | null
}) {
  const [name, setName] = useState(editingPlan?.name ?? "")
  const [description, setDescription] = useState(editingPlan?.description ?? "")
  const [color, setColor] = useState<PlanColor>(editingPlan?.color ?? "emerald")

  const handleOpenChange = (value: boolean) => {
    if (!value) {
      setName(editingPlan?.name ?? "")
      setDescription(editingPlan?.description ?? "")
      setColor(editingPlan?.color ?? "emerald")
    }
    onOpenChange(value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    onSubmit({ name: name.trim(), description: description.trim(), color, icon: "dumbbell" })
    handleOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="font-mono uppercase tracking-tight text-foreground">
            {editingPlan ? "Editar Plan" : "Nuevo Plan"}
          </DialogTitle>
          <DialogDescription>
            {editingPlan
              ? "Modifica los detalles del plan de entrenamiento."
              : "Crea un nuevo plan de entrenamiento semanal."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="plan-name" className="text-foreground">Nombre del plan</Label>
            <Input
              id="plan-name"
              placeholder="Ej: Gimnasio - Fuerza"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
              autoFocus
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="plan-desc" className="text-foreground">Descripcion</Label>
            <Input
              id="plan-desc"
              placeholder="Ej: Entrenamiento de fuerza con pesas"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-foreground">Color</Label>
            <div className="flex items-center gap-2">
              {PLAN_COLORS.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setColor(c.value)}
                  className={`size-8 rounded-full transition-all ${c.class} ${
                    color === c.value
                      ? "ring-2 ring-offset-2 ring-offset-card ring-foreground scale-110"
                      : "opacity-60 hover:opacity-100"
                  }`}
                  aria-label={`Color ${c.label}`}
                />
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="ghost"
              onClick={() => handleOpenChange(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={!name.trim()}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {editingPlan ? "Guardar" : "Crear Plan"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
