"use client";

import AddExercise from "@/db/addExercise";
import AddPlan from "@/db/addPlan";
import DeleteExercise from "@/db/deleteExercise";
import DeletePlan from "@/db/deletePlan";
import ToggleRestDay from "@/db/toggleRestDay";
import UpdateExerciseOrder from "@/db/updateExerciseOrder";
import UpdatePlan from "@/db/updatePlan";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { training_exercise, training_plan } from "../generated/prisma/client";
import { TrainingDayFull } from "../features/dayTraining/day.types";

export function usePlans() {
  const queryClient = useQueryClient();
  const invalidatePlans = () => {
    queryClient.invalidateQueries({ queryKey: ["plans"] });
    queryClient.invalidateQueries({ queryKey: ["plansToday"] });
  };

  const addExerciseMutation = useMutation({
    mutationFn: AddExercise,
    onSuccess: invalidatePlans,
  });
  const deleteExerciseMutation = useMutation({
    mutationFn: DeleteExercise,
    onSuccess: invalidatePlans,
  });
  const toggleRestDayMutation = useMutation({
    mutationFn: ToggleRestDay,
    onSuccess: invalidatePlans,
  });
  const deletePlanMutation = useMutation({
    mutationFn: DeletePlan,
    onSuccess: invalidatePlans,
  });
  const updatePlanMutation = useMutation({
    mutationFn: UpdatePlan,
    onSuccess: invalidatePlans,
  });
  const addPlanMutation = useMutation({
    mutationFn: AddPlan,
    onSuccess: invalidatePlans,
  });
  const updateExerciseOrderMutation = useMutation({
    mutationFn: UpdateExerciseOrder,
    onSuccess: invalidatePlans,
    onMutate: async ({ exerciseId, order_index }) => {
      // await queryClient.cancelQueries({ queryKey: ["plansToday"] });

      const previousData = queryClient.getQueryData(["plansToday"]);
      queryClient.setQueryData(
        ["plansToday"],
        (old: { dayPlan: TrainingDayFull; plan: training_plan }[]) => {
          const planOld = old[0];
          if (!planOld) return planOld;
          // console.log(planOld?.dayPlan?.training_exercise);
          return [{
            ...planOld,
            dayPlan: {
              ...planOld.dayPlan,
              training_exercise: reorderExercises(
                planOld.dayPlan.training_exercise,
                exerciseId,
                order_index,
              ),
            },
          }];
        },
      );
      return { previousData };
    },
  });

  const { data: plans, isLoading } = useQuery({
    queryKey: ["plans"],
    queryFn: async () => await fetch("/api/plan").then((res) => res.json()),
  });
  return {
    plans,
    isLoading,
    addPlanMutation,
    updatePlanMutation,
    deletePlanMutation,
    addExerciseMutation,
    toggleRestDayMutation,
    deleteExerciseMutation,
    updateExerciseOrderMutation,
  };
}
function reorderExercises(
  exercises: training_exercise[],
  exerciseId: number,
  newOrderIndex: number,
) {
  const updated = exercises.map((e) =>
    e.id === exerciseId ? { ...e, order_index: newOrderIndex } : e,
  );

  return [...updated].sort((a, b) => a.order_index - b.order_index);
}
