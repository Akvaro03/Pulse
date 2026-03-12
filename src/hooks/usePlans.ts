"use client";

import AddExercise from "@/db/addExercise";
import AddPlan from "@/db/addPlan";
import DeleteExercise from "@/db/deleteExercise";
import DeletePlan from "@/db/deletePlan";
import ToggleRestDay from "@/db/toggleRestDay";
import UpdatePlan from "@/db/updatePlan";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
  };
}
