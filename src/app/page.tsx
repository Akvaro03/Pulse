"use client";

import { PlansSection } from "@/components/plan-section";
import { useTodayPlans } from "../hooks/useTodayPlans";
import { TodayPanel } from "@/components/today-panel";
import { Header } from "@/components/header";
import { usePlans } from "../hooks/usePlans";

export default function HomePage() {
  const {
    deleteExerciseMutation,
    toggleRestDayMutation,
    addExerciseMutation,
    deletePlanMutation,
    updatePlanMutation,
    addPlanMutation,
    isLoading,
    plans,
  } = usePlans();
  const { todayPlans, isLoadingToday } = useTodayPlans();
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-8 md:px-6">
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Today's workouts - main focus */}
          <div className="lg:col-span-3">
            {todayPlans && !isLoadingToday && (
              <TodayPanel todayPlans={todayPlans} />
            )}
          </div>

          {/* Plans management - sidebar */}
          <div className="lg:col-span-2">
            {plans && !isLoading && (
              <PlansSection
                plans={plans}
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
                  deleteExerciseMutation.mutate({ planId, day, exerciseId })
                }
                onToggleRest={(planId, day, isRest) =>
                  toggleRestDayMutation.mutate({ planId, day, isRest })
                }
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
