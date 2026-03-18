import { DAYS_OF_WEEK } from "@/lib/training-store";

function WeekStrip({ todayName }: { todayName: string }) {
  const shortDays = ["L", "M", "X", "J", "V", "S", "D"];
  return (
    <div className="flex items-center gap-1.5">
      {DAYS_OF_WEEK.map((day, i) => {
        const isToday = day === todayName;
        return (
          <div
            key={day}
            className={`flex size-8 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
              isToday
                ? "bg-primary text-primary-foreground"
                : "bg-secondary/50 text-muted-foreground"
            }`}
          >
            {shortDays[i]}
          </div>
        );
      })}
    </div>
  );
}

export default WeekStrip;
