"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { DayOfWeek } from "@/lib/training-store";

export function AddExerciseDialog({
  open,
  onOpenChange,
  onSubmit,
  dayName,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (exercise: {
    name: string;
    sets?: number;
    reps?: string;
    rest_seconds?: number;
    order_index?: number;
    notes?: string;
  }) => void;
  dayName: DayOfWeek;
}) {
  const [name, setName] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [rest_seconds, setRest_seconds] = useState("");
  const [order_index, setOrder_index] = useState("");
  const [notes, setNotes] = useState("");

  const handleOpenChange = (value: boolean) => {
    if (!value) {
      setName("");
      setSets("");
      setReps("");
      setRest_seconds("");
      setOrder_index("");
      setNotes("");
    }
    onOpenChange(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit({
      name: name.trim(),
      sets: sets ? parseInt(sets) : undefined,
      reps: reps || undefined,
      rest_seconds: rest_seconds ? parseInt(rest_seconds) : undefined,
      order_index: order_index ? parseInt(order_index) : undefined,
      notes: notes || undefined,
    });
    handleOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="font-mono uppercase tracking-tight text-foreground">
            Agregar Ejercicio
          </DialogTitle>
          <DialogDescription>
            Agrega un nuevo ejercicio para el {dayName}.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="exercise-name" className="text-foreground">
              Nombre del ejercicio
            </Label>
            <Input
              id="exercise-name"
              placeholder="Ej: Press de banca"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
              autoFocus
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="exercise-sets" className="text-foreground">
                Series
              </Label>
              <Input
                id="exercise-sets"
                type="number"
                min={1}
                placeholder="4"
                value={sets}
                onChange={(e) => setSets(e.target.value)}
                className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="exercise-reps" className="text-foreground">
                Repeticiones
              </Label>
              <Input
                id="exercise-reps"
                placeholder="8-10"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
                className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="exercise-duration" className="text-foreground">
              Descanso entre sets (opcional)
            </Label>
            <Input
              id="exercise-duration"
              placeholder="Ej: 5 min"
              value={rest_seconds}
              onChange={(e) => setRest_seconds(e.target.value)}
              className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="exercise-notes" className="text-foreground">
              Notas (opcional)
            </Label>
            <Input
              id="exercise-notes"
              placeholder="Ej: Aumentar peso progresivamente"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
            />
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
              Agregar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
