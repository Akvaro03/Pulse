"use client";

import { Dumbbell, Pencil, Trash2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PLAN_COLORS, DAYS_OF_WEEK } from "@/lib/training-store";
import { TrainingPlanFull } from "@/src/features/plans/plan.types";
function getColorConfig(color: string) {
  return PLAN_COLORS.find((c) => c.value === color) || PLAN_COLORS[0];
}

export function PlanCard({
  plan,
  onSelect,
  onEdit,
  onDelete,
}: {
  plan: TrainingPlanFull;
  onSelect: (plan: TrainingPlanFull) => void;
  onEdit: (plan: TrainingPlanFull) => void;
  onDelete: (planId: number) => void;
}) {
  const colorConfig = getColorConfig(plan.color || "");
  const activeDays = plan.training_day.filter(
    (d) => !d.is_rest && d.training_exercise.length > 0,
  );
  const totalExercises = plan.training_day.reduce(
    (sum, d) => sum + d.training_exercise.length,
    0,
  );
  return (
    <div
      className={`group relative rounded-xl border border-border/50 bg-card transition-all hover:border-border hover:bg-card/80 cursor-pointer hover:shadow-md hover:scale-[1.01] ${
        plan.is_daily
          ? "border-primary/40 bg-primary/5 hover:bg-primary/10"
          : "border-border/50 bg-card hover:bg-card/80"
      }`}
      onClick={() => onSelect(plan)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(plan);
        }
      }}
    >
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`rounded-xl p-3 ${colorConfig.bg} shadow-sm`}>
              <Dumbbell className={`size-5 ${colorConfig.text}`} />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{plan.name}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                {plan.description}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
            <Button
              variant="ghost"
              size="icon"
              className="size-7 text-muted-foreground hover:text-foreground"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(plan);
              }}
            >
              <Pencil className="size-3.5" />
              <span className="sr-only">Editar plan</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="size-7 text-muted-foreground hover:text-destructive"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(plan.id);
              }}
            >
              <Trash2 className="size-3.5" />
              <span className="sr-only">Eliminar plan</span>
            </Button>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-4">
          {plan.is_daily ? (
            <>
              <div className="flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1.5 ring-1 ring-primary/30">
                <span className="text-xs font-semibold text-primary tracking-wide">
                  DIARIO
                </span>
              </div>{" "}
              <span className="text-xs text-muted-foreground">
                {Math.round(totalExercises / 7)} por día
              </span>{" "}
            </>
          ) : (
            <>
              <span className="text-xs text-muted-foreground">
                {activeDays.length} dias activos
              </span>
              <span className="text-xs text-muted-foreground">
                {totalExercises} ejercicios
              </span>
            </>
          )}
        </div>
        {!plan.is_daily && (
          <div className="mt-3 flex items-center gap-1">
            {DAYS_OF_WEEK.map((day) => {
              const dayPlan = plan.training_day.find((d) => d.day_name === day);
              const isActive =
                dayPlan &&
                !dayPlan.is_rest &&
                dayPlan.training_exercise.length > 0;
              const shortDays: Record<string, string> = {
                Lunes: "L",
                Martes: "M",
                Miércoles: "X",
                Jueves: "J",
                Viernes: "V",
                Sábado: "S",
                Domingo: "D",
              };
              return (
                <span
                  key={day}
                  className={`flex size-7 items-center justify-center rounded-md text-[10px] font-semibold transition-colors ${
                    isActive
                      ? `${colorConfig.bg} ${colorConfig.text}`
                      : "bg-secondary/30 text-muted-foreground/50"
                  }`}
                >
                  {shortDays[day]}
                </span>
              );
            })}
            <ChevronRight className="ml-auto size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
        )}
      </div>
    </div>
  );
}
