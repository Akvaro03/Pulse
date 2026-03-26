"use client";

import {
  ArrowLeft,
  Dumbbell,
  Plus,
  Trash2,
  Moon,
  Timer,
  Activity,
  StickyNote,
} from "lucide-react";
import {
  PLAN_COLORS,
  DAYS_OF_WEEK,
  type DayOfWeek,
  PlanColor,
} from "@/lib/training-store";
import { AddExerciseDialog } from "@/components/add-exercise-dialog";
import { TrainingPlanFull } from "@/src/features/plans/plan.types";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

function getColorConfig(color: string) {
  return PLAN_COLORS.find((c) => c.value === color) || PLAN_COLORS[0];
}
export function PlanDetailDaily({
  plan,
  onBack,
  onAddExercise,
  onRemoveExercise,
  onToggleRest,
}: {
  plan: TrainingPlanFull;
  onBack: () => void;
  onAddExercise: (
    planId: number,
    day: DayOfWeek,
    exercise: {
      name: string;
      sets?: number;
      reps?: string;
      duration?: string;
      notes?: string;
    },
  ) => void;
  onRemoveExercise: (
    planId: number,
    day: DayOfWeek,
    exerciseId: number,
  ) => void;
  onToggleRest: (planId: number, day: DayOfWeek, isRest: boolean) => void;
}) {
  console.log("diario");
  const [isAddExercise, setIsAddExercise] = useState<boolean>(false);
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>(DAYS_OF_WEEK[0]);
  const colorConfig = getColorConfig(plan.color as PlanColor);

  const currentDayPlan = plan.training_day.find(
    (d) => d.day_name === selectedDay,
  );
  const addExercise = () => setIsAddExercise(true);
  return (
    <div>
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="size-8 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          <span className="sr-only">Volver</span>
        </Button>
        <div className={`rounded-lg p-2 ${colorConfig.bg}`}>
          <Dumbbell className={`size-4 ${colorConfig.text}`} />
        </div>
        <div>
          <h2 className="font-mono text-lg font-bold uppercase tracking-tight text-foreground">
            {plan.name}
          </h2>
          <p className="text-xs text-muted-foreground">{plan.description}</p>
        </div>
      </div>

      {/* Day content */}
      <div className="mt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {currentDayPlan?.is_rest &&
            currentDayPlan.training_exercise.length === 0 ? (
              <Button
                size="sm"
                variant="secondary"
                className="h-7 text-xs bg-secondary text-secondary-foreground hover:bg-secondary/80"
                onClick={addExercise}
              >
                <Plus className="mr-1 size-3" />
                Agregar ejercicio
              </Button>
            ) : (
              <>
                <Button
                  size="sm"
                  variant="secondary"
                  className="h-7 text-xs bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  onClick={addExercise}
                >
                  <Plus className="mr-1 size-3" />
                  Agregar
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 text-xs text-muted-foreground hover:text-foreground"
                  onClick={() => onToggleRest(plan.id, selectedDay, true)}
                >
                  <Moon className="mr-1 size-3" />
                  Descanso
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="mt-3 space-y-2">
          {currentDayPlan &&
          !currentDayPlan.is_rest &&
          currentDayPlan.training_exercise.length > 0 ? (
            currentDayPlan.training_exercise.map((exercise, index) => (
              <div
                key={exercise.id}
                className="group flex items-start gap-3 rounded-xl border border-border/30 bg-secondary/20 p-3 transition-colors hover:bg-secondary/40"
              >
                <span
                  className={`mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md text-[11px] font-bold ${colorConfig.bg} ${colorConfig.text}`}
                >
                  {index + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground text-sm">
                    {exercise.name}
                  </p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-2">
                    {exercise.sets && exercise.reps && (
                      <div className="flex items-center gap-1">
                        <Activity className="size-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground font-mono">
                          {exercise.sets} x {exercise.reps}
                        </span>
                      </div>
                    )}
                    {exercise.reps && (
                      <div className="flex items-center gap-1">
                        <Timer className="size-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground font-mono">
                          {exercise.reps}
                        </span>
                      </div>
                    )}
                    {exercise.notes && (
                      <div className="flex items-center gap-1">
                        <StickyNote className="size-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {exercise.notes}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-6 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:text-destructive shrink-0"
                  onClick={() => {
                    onRemoveExercise(plan.id, "Lunes", exercise.id);
                  }}
                >
                  <Trash2 className="size-3" />
                  <span className="sr-only">Eliminar ejercicio</span>
                </Button>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border/30 py-10">
              <div className="rounded-full bg-secondary/50 p-3">
                <Moon className="size-5 text-muted-foreground" />
              </div>
              <p className="mt-3 text-sm font-medium text-foreground">
                Dia de descanso
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Agrega ejercicios para activar este dia
              </p>
            </div>
          )}
        </div>
      </div>

      <AddExerciseDialog
        open={isAddExercise}
        onOpenChange={(open) => {
          if (!open) console.log("no esta abierto");
        }}
        onSubmit={(exercise) => {
          if (isAddExercise) {
            onAddExercise(plan.id, "Lunes", exercise);
            onAddExercise(plan.id, "Martes", exercise);
            onAddExercise(plan.id, "Miércoles", exercise);
            onAddExercise(plan.id, "Jueves", exercise);
            onAddExercise(plan.id, "Viernes", exercise);
            onAddExercise(plan.id, "Sábado", exercise);
            onAddExercise(plan.id, "Domingo", exercise);
            setIsAddExercise(false);
          }
        }}
        dayName={"Lunes"}
      />
    </div>
  );
}
