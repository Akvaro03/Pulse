"use client";

import {
  CalendarDays,
  Dumbbell,
  Moon,
  Timer,
  ChevronRight,
  Activity,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  PLAN_COLORS,
  DAYS_OF_WEEK,
  PlanColor,
} from "@/lib/training-store";
import { training_plan } from "@/src/generated/prisma/client";
import { TrainingDayFull } from "@/src/features/dayTraining/day.types";
import getTodayName from "@/src/hooks/getTodayName";

function getColorConfig(color: string) {
  return PLAN_COLORS.find((c) => c.value === color) || PLAN_COLORS[0];
}

function WeekStrip({ todayName }: { todayName: string }) {
  const shortDays = ["L", "M", "X", "J", "V", "S", "D"];
  return (
    <div className="flex items-center gap-1.5">
      {DAYS_OF_WEEK.map((day, i) => {
        const isToday = day === todayName;
        return (
          <div
            key={day}
            className={`flex size-8 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
              isToday
                ? "bg-primary text-primary-foreground"
                : "bg-secondary/50 text-muted-foreground"
            }`}
          >
            {shortDays[i]}
          </div>
        );
      })}
    </div>
  );
}

function WorkoutCard({
  workout,
}: {
  workout: { dayPlan: TrainingDayFull; plan: training_plan };
}) {
  const colorConfig = getColorConfig(workout.plan.color as PlanColor);
  const totalExercises = workout.dayPlan.training_exercise.length;
  const totalSets = workout.dayPlan.training_exercise.reduce(
    (sum, e) => sum + (e.sets || 0),
    0,
  );
  const defaultRestTime = 30;
  const secondsPerRep = 4;
  const totalTime = workout.dayPlan.training_exercise
    .map((ex) => {
      const sets = ex.sets ?? 1;
      const rest = ex.rest_seconds ?? defaultRestTime;

      const reps = 8;
      const setTime = reps * secondsPerRep;

      return sets * setTime + (sets - 1) * rest;
    })
    .reduce((a, b) => a + b, 0);
  return (
    <div className="group rounded-xl border border-border/50 bg-card p-4 transition-all hover:border-border hover:bg-card/80">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className={`rounded-lg p-2.5 ${colorConfig.bg}`}>
            <Dumbbell className={`size-4 ${colorConfig.text}`} />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">
              {workout.plan.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {workout.plan.description}
            </p>
          </div>
        </div>
        <ChevronRight className="size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
      </div>

      <div className="mt-4 flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <Activity className="size-3.5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {totalExercises} ejercicios
          </span>
        </div>
        {totalSets > 0 && (
          <div className="flex items-center gap-1.5">
            <Timer className="size-3.5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {totalSets} series
            </span>
          </div>
        )}
        {totalTime > 0 && (
          <div className="flex items-center gap-1.5">
            <Timer className="size-3.5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {(totalTime / 60).toFixed(0)} minutos total
            </span>
          </div>
        )}
      </div>

      <div className="mt-3 space-y-2">
        {workout.dayPlan.training_exercise.map((exercise, index) => (
          <div
            key={exercise.id}
            className="flex items-center gap-3 rounded-lg bg-secondary/30 px-3 py-2"
          >
            <span
              className={`flex size-5 shrink-0 items-center justify-center rounded text-[10px] font-bold ${colorConfig.bg} ${colorConfig.text}`}
            >
              {index + 1}
            </span>
            <div className="flex-1 min-w-0">
              <span className="text-sm font-medium text-foreground">
                {exercise.name}
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {exercise.sets && exercise.reps && (
                <Badge
                  variant="secondary"
                  className="text-[10px] font-mono bg-secondary text-secondary-foreground"
                >
                  {exercise.sets}x{exercise.reps}
                </Badge>
              )}
              {exercise.rest_seconds && (
                <Badge
                  variant="secondary"
                  className="text-[10px] font-mono bg-secondary text-secondary-foreground"
                >
                  {exercise.rest_seconds}s
                </Badge>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TodayPanel({
  todayPlans,
}: {
  todayPlans: { dayPlan: TrainingDayFull; plan: training_plan }[];
}) {
  const now = new Date();
  const dateString = now.toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  const todayName = getTodayName()
  return (
    <section>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <CalendarDays className="size-5 text-primary" />
            <h2 className="font-mono text-xl font-bold uppercase tracking-tight text-foreground">
              Hoy
            </h2>
          </div>
          <p className="mt-1 text-sm capitalize text-muted-foreground">
            {dateString}
          </p>
        </div>
        <WeekStrip todayName={todayName} />
      </div>

      <div className="mt-6 space-y-4">
        {todayPlans.length > 0 ? (
          todayPlans.map(({ dayPlan, plan }) => (
            <WorkoutCard key={plan.id} workout={{ plan, dayPlan }} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border/50 py-12">
            <div className="rounded-full bg-secondary/50 p-4">
              <Moon className="size-6 text-muted-foreground" />
            </div>
            <p className="mt-4 text-sm font-medium text-foreground">
              Dia de descanso
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              No tienes entrenamientos programados para hoy
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
