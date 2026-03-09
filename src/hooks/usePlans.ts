"use client";

import AddExercise from "@/db/addExercise";
import AddPlan from "@/db/addPlan";
import DeletePlan from "@/db/deletePlan";
import ToggleRestDay from "@/db/toggleRestDay";
import UpdatePlan from "@/db/updatePlan";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function usePlans() {
  const queryClient = useQueryClient();
  const addExerciseMutation = useMutation({
    mutationFn: AddExercise,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["plans"],
      });
    },
  });
  const toggleRestDayMutation = useMutation({
    mutationFn: ToggleRestDay,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["plans"],
      });
    },
  });
  const deletePlanMutation = useMutation({
    mutationFn: DeletePlan,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["plans"],
      });
    },
  });
  const updatePlanMutation = useMutation({
    mutationFn: UpdatePlan,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["plans"],
      });
    },
  });
  const addPlanMutation = useMutation({
    mutationFn: AddPlan,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["plans"],
      });
    },
  });

  const { data: plans } = useQuery({
    queryKey: ["plans"],
    queryFn: async () => await fetch("/api/plan").then((res) => res.json()),
    refetchInterval: 15000,
  });

  return { plans, addExerciseMutation, toggleRestDayMutation, deletePlanMutation, updatePlanMutation, addPlanMutation };
}
