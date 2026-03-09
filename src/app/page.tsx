"use client";

import { PlansSection } from "@/components/plan-section";
import { useTrainingStore } from "@/lib/training-store";
import { TodayPanel } from "@/components/today-panel";
import ToggleRestDay from "@/db/toggleRestDay";
import { Header } from "@/components/header";
import DeletePlan from "@/db/deletePlan";
import UpdatePlan from "@/db/updatePlan";
import AddPlan from "@/db/addPlan";
import { usePlans } from "../hooks/usePlans";

export default function HomePage() {
  const store = useTrainingStore();
  const todayWorkouts = store.getTodayWorkouts();
  const todayName = store.getTodayName();

  const {
    plans,
    addExerciseMutation,
    toggleRestDayMutation,
    deletePlanMutation,
    updatePlanMutation,
    addPlanMutation,
  } = usePlans();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-8 md:px-6">
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Today's workouts - main focus */}
          <div className="lg:col-span-3">
            <TodayPanel workouts={todayWorkouts} todayName={todayName} />
          </div>

          {/* Plans management - sidebar */}
          <div className="lg:col-span-2">
            <PlansSection
              plans={plans || []}
              onAddPlan={(data) => addPlanMutation.mutate(data)}
              onUpdatePlan={(id, data) =>
                updatePlanMutation.mutate({ planId: id, ...data })
              }
              onDeletePlan={(id) => deletePlanMutation.mutate({ planId: id })}
              onAddExercise={(planId, day, exercise) =>
                addExerciseMutation.mutate({
                  planId,
                  day,
                  exercise,
                })
              }
              onRemoveExercise={(planId, day, exerciseId) =>
                console.log(planId, day, exerciseId)
              }
              onToggleRest={(planId, day, isRest) =>
                toggleRestDayMutation.mutate({ planId, day, isRest })
              }
            />
          </div>
        </div>
      </main>
    </div>
  );
}
