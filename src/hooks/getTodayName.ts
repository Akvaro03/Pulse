function getTodayName() {
  const todayIndex = new Date().getDay();
  return DAY_INDEX_MAP[todayIndex];
}
export type DayOfWeek =
  | "Lunes"
  | "Martes"
  | "Miércoles"
  | "Jueves"
  | "Viernes"
  | "Sábado"
  | "Domingo";

export const DAY_INDEX_MAP: Record<number, DayOfWeek> = {
  1: "Lunes",
  2: "Martes",
  3: "Miércoles",
  4: "Jueves",
  5: "Viernes",
  6: "Sábado",
  0: "Domingo",
};

export default getTodayName;
