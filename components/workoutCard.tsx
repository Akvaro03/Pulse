import {
  training_plan,
} from "@/src/generated/prisma/client";
import { UpdateExerciseOrderDTO } from "@/src/features/plans/plans.schema";
import { TrainingDayFull } from "../src/features/dayTraining/day.types";
import { Activity, ChevronRight, Dumbbell, Timer } from "lucide-react";
import { PLAN_COLORS, PlanColor } from "@/lib/training-store";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { Reorder } from "framer-motion";

function WorkoutCard({
  workout,
  updateExerciseOrder,
}: {
  workout: { dayPlan: TrainingDayFull; plan: training_plan };
  updateExerciseOrder: (exerciseOrder: UpdateExerciseOrderDTO) => void;
}) {
  const [exercises, setExercises] = useState(workout.dayPlan.training_exercise);
  const [draggedId, setDraggedId] = useState<number | null>(null);
  useEffect(() => {
    const setData = () => {
      setExercises(workout.dayPlan.training_exercise);
    };
    setData();
  }, [workout]);

  const colorConfig = getColorConfig(workout.plan.color as PlanColor);
  const totalExercises = exercises.length;
  const totalSets = exercises.reduce((sum, e) => sum + (e.sets || 0), 0);
  const defaultRestTime = 30;
  const secondsPerRep = 4;
  const totalTime = exercises
    .map((ex) => {
      const sets = ex.sets ?? 1;
      const rest = ex.rest_seconds ?? defaultRestTime;

      const reps = 8;
      const setTime = reps * secondsPerRep;

      return sets * setTime + (sets - 1) * rest;
    })
    .reduce((a, b) => a + b, 0);
  function handleDragEnd() {
    if (!draggedId) return;

    const newOrder = exercises;

    const newIndex = newOrder.findIndex((e) => e.id === draggedId);

    const prev = newOrder[newIndex - 1];
    const next = newOrder[newIndex + 1];

    let newOrderIndex: number;

    if (!prev) {
      newOrderIndex = (next?.order_index ?? 1000) / 2;
    } else if (!next) {
      newOrderIndex = prev.order_index + 1000;
    } else {
      newOrderIndex = (prev.order_index + next.order_index) / 2;
    }

    // persistencia UNA sola vez
    updateExerciseOrder({
      exerciseId: draggedId,
      order_index: newOrderIndex,
    });
  }
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
        <Reorder.Group
          axis="y"
          values={exercises}
          onReorder={(newOrder) => {
            setExercises(newOrder); // solo UI
          }}
        >
          {exercises.map((exercise, index) => (
            <Reorder.Item
              key={exercise.id}
              value={exercise}
              onDragEnd={handleDragEnd}
              onDragStart={() => setDraggedId(exercise.id)}
              className="flex items-center gap-3 rounded-lg bg-secondary/30 px-3 py-2 my-4"
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
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </div>
    </div>
  );
}
export default WorkoutCard;

function getColorConfig(color: string) {
  return PLAN_COLORS.find((c) => c.value === color) || PLAN_COLORS[0];
}