import { useQuery } from "@tanstack/react-query";

export function useTodayPlans() {
  const { data: todayPlans, isLoading:isLoadingToday } = useQuery({
    queryKey: ["plansToday"],
    queryFn: async () =>
      await fetch("/api/day/today").then((res) => res.json()),
    refetchInterval: 15000,
  });
  return { todayPlans, isLoadingToday };
}
