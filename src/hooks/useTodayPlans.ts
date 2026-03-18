import { useQuery } from "@tanstack/react-query";

export function useTodayPlans() {
  const { data: todayPlans, isLoading: isLoadingToday } = useQuery({
    queryKey: ["plansToday"],
    queryFn: async () =>
      await fetch("/api/day/today").then((res) => res.json()),
  });
  return { todayPlans, isLoadingToday };
}
