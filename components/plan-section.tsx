"use client";

import { CreatePlanDialog } from "@/components/create-plan-dialog";
import { TrainingPlanFull } from "@/src/features/plans/plan.types";
import { PlanDetail } from "@/components/plan-detail";
import type { DayOfWeek } from "@/lib/training-store";
import { PlanCard } from "@/components/plan-card";
import { Plus, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { PlanDetailDaily } from "./plan-detail-dialy";

export function PlansSection({
  plans,
  onAddPlan,
  onUpdatePlan,
  onDeletePlan,
  onAddExercise,
  onRemoveExercise,
  onToggleRest,
}: {
  plans: TrainingPlanFull[];
  onAddPlan: (data: {
    name: string;
    description: string;
    color: string;
    isDaily: boolean;
    icon: string;
  }) => void;
  onUpdatePlan: (
    planId: number,
    data: { name: string; description: string; color: string; icon: string },
  ) => void;
  onDeletePlan: (planId: number) => void;
  onAddExercise: (
    planId: number,
    day: DayOfWeek,
    exercise: {
      name: string;
      sets?: number;
      reps?: string;
      notes?: string;
      rest_seconds?: number;
      order_index?: number;
    },
  ) => void;
  onRemoveExercise: (
    planId: number,
    day: DayOfWeek,
    exerciseId: number,
  ) => void;
  onToggleRest: (planId: number, day: DayOfWeek, isRest: boolean) => void;
}) {
  const [selectedPlan, setSelectedPlan] = useState<TrainingPlanFull | null>(
    null,
  );
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<TrainingPlanFull | null>(null);

  // Keep the selected plan in sync with store updates
  const activePlan = selectedPlan
    ? plans.find((p) => p.id === selectedPlan.id) || null
    : null;
  if (activePlan) {
    if (activePlan.is_daily) {
      return (
        <section>
          <PlanDetailDaily
            plan={activePlan}
            onBack={() => setSelectedPlan(null)}
            onAddExercise={onAddExercise}
            onRemoveExercise={onRemoveExercise}
            onToggleRest={onToggleRest}
          />
        </section>
      );
    }
    return (
      <section>
        <PlanDetail
          plan={activePlan}
          onBack={() => setSelectedPlan(null)}
          onAddExercise={onAddExercise}
          onRemoveExercise={onRemoveExercise}
          onToggleRest={onToggleRest}
        />
      </section>
    );
  }

  return (
    <section>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <LayoutGrid className="size-5 text-primary" />
          <h2 className="font-mono text-xl font-bold uppercase tracking-tight text-foreground">
            Mis Planes
          </h2>
        </div>
        <Button
          size="sm"
          onClick={() => {
            setEditingPlan(null);
            setCreateDialogOpen(true);
          }}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="mr-1 size-3.5" />
          Nuevo Plan
        </Button>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            onSelect={(p) => setSelectedPlan(p)}
            onEdit={(p) => {
              setEditingPlan(p);
              setCreateDialogOpen(true);
            }}
            onDelete={(id) => {
              onDeletePlan(id);
              toast.success("Plan eliminado");
            }}
          />
        ))}
      </div>

      {plans.length === 0 && (
        <div className="mt-4 flex flex-col items-center justify-center rounded-xl border border-dashed border-border/50 py-12">
          <LayoutGrid className="size-8 text-muted-foreground" />
          <p className="mt-4 text-sm font-medium text-foreground">
            No tienes planes creados
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Crea tu primer plan de entrenamiento
          </p>
          <Button
            size="sm"
            className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => {
              setEditingPlan(null);
              setCreateDialogOpen(true);
            }}
          >
            <Plus className="mr-1 size-3.5" />
            Crear Plan
          </Button>
        </div>
      )}

      <CreatePlanDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        editingPlan={editingPlan}
        onSubmit={async (data) => {
          if (editingPlan) {
            onUpdatePlan(editingPlan.id, data);
            toast.success("Plan actualizado");
          } else {
            onAddPlan(data);
            toast.success("Plan creado");
          }
        }}
      />
    </section>
  );
}
