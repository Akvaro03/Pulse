"use client"

import { Header } from "@/components/header"
import { TodayPanel } from "@/components/today-panel"
import { PlansSection } from "@/components/plan-section"
import { useTrainingStore } from "@/lib/training-store"

export default function HomePage() {
  const store = useTrainingStore()
  const todayWorkouts = store.getTodayWorkouts()
  const todayName = store.getTodayName()

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
              plans={store.plans}
              onAddPlan={(data) => store.addPlan(data)}
              onUpdatePlan={(id, data) => store.updatePlan(id, data)}
              onDeletePlan={(id) => store.deletePlan(id)}
              onAddExercise={(planId, day, exercise) =>
                store.addExercise(planId, day, exercise)
              }
              onRemoveExercise={(planId, day, exerciseId) =>
                store.removeExercise(planId, day, exerciseId)
              }
              onToggleRest={(planId, day, isRest) =>
                store.updateDayPlan(planId, day, { isRest, exercises: [] })
              }
            />
          </div>
        </div>
      </main>
    </div>
  )
}
