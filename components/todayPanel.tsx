import { TrainingDayFull } from "@/src/features/dayTraining/day.types";
import { training_plan } from "@/src/generated/prisma/client";
import getTodayName from "@/src/hooks/getTodayName";
import { CalendarDays, Moon } from "lucide-react";
import WeekStrip from "./weekStrip";
import WorkoutCard from "./workoutCard";
import { UpdateExerciseOrderDTO } from "@/src/features/plans/plans.schema";

function TodayPanel({
  todayPlans,
  updateExerciseOrder,
}: {
  todayPlans: { dayPlan: TrainingDayFull; plan: training_plan }[];
  updateExerciseOrder: (exerciseOrder: UpdateExerciseOrderDTO) => void;
}) {
  const now = new Date();
  const dateString = now.toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  const todayName = getTodayName();
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
            <WorkoutCard
              updateExerciseOrder={updateExerciseOrder}
              key={plan.id}
              workout={{ plan, dayPlan }}
            />
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

export default TodayPanel;
