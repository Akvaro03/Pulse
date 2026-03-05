import { useSyncExternalStore } from "react"

export type Exercise = {
  id: string
  name: string
  sets?: number
  reps?: string
  duration?: string
  notes?: string
}

export type DayPlan = {
  day: DayOfWeek
  exercises: Exercise[]
  isRest: boolean
}

export type DayOfWeek = "Lunes" | "Martes" | "Miércoles" | "Jueves" | "Viernes" | "Sábado" | "Domingo"

export const DAYS_OF_WEEK: DayOfWeek[] = [
  "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"
]

export const DAY_INDEX_MAP: Record<number, DayOfWeek> = {
  1: "Lunes",
  2: "Martes",
  3: "Miércoles",
  4: "Jueves",
  5: "Viernes",
  6: "Sábado",
  0: "Domingo",
}

export type PlanColor = "emerald" | "cyan" | "amber" | "rose" | "indigo"

export const PLAN_COLORS: { value: PlanColor; label: string; class: string; bg: string; text: string }[] = [
  { value: "emerald", label: "Verde", class: "bg-emerald-500", bg: "bg-emerald-500/15", text: "text-emerald-400" },
  { value: "cyan", label: "Azul", class: "bg-cyan-500", bg: "bg-cyan-500/15", text: "text-cyan-400" },
  { value: "amber", label: "Naranja", class: "bg-amber-500", bg: "bg-amber-500/15", text: "text-amber-400" },
  { value: "rose", label: "Rojo", class: "bg-rose-500", bg: "bg-rose-500/15", text: "text-rose-400" },
  { value: "indigo", label: "Indigo", class: "bg-indigo-500", bg: "bg-indigo-500/15", text: "text-indigo-400" },
]

export type TrainingPlan = {
  id: string
  name: string
  description: string
  color: PlanColor
  icon: string
  days: DayPlan[]
  createdAt: string
}

function generateId() {
  return Math.random().toString(36).substring(2, 15)
}

const DEFAULT_PLANS: TrainingPlan[] = [
  {
    id: "plan-gym",
    name: "Gimnasio - Fuerza",
    description: "Entrenamiento de fuerza con pesas",
    color: "emerald",
    icon: "dumbbell",
    createdAt: new Date().toISOString(),
    days: [
      {
        day: "Lunes",
        isRest: false,
        exercises: [
          { id: "e1", name: "Press de banca", sets: 4, reps: "8-10", notes: "Aumentar peso progresivamente" },
          { id: "e2", name: "Remo con barra", sets: 4, reps: "8-10" },
          { id: "e3", name: "Press militar", sets: 3, reps: "10-12" },
          { id: "e4", name: "Curl de biceps", sets: 3, reps: "12" },
        ],
      },
      { day: "Martes", isRest: true, exercises: [] },
      {
        day: "Miércoles",
        isRest: false,
        exercises: [
          { id: "e5", name: "Sentadilla", sets: 4, reps: "6-8", notes: "Calentar bien las rodillas" },
          { id: "e6", name: "Peso muerto rumano", sets: 4, reps: "8-10" },
          { id: "e7", name: "Prensa de piernas", sets: 3, reps: "12" },
          { id: "e8", name: "Elevaciones de gemelos", sets: 4, reps: "15" },
        ],
      },
      { day: "Jueves", isRest: true, exercises: [] },
      {
        day: "Viernes",
        isRest: false,
        exercises: [
          { id: "e9", name: "Dominadas", sets: 4, reps: "6-8" },
          { id: "e10", name: "Press inclinado con mancuernas", sets: 4, reps: "10" },
          { id: "e11", name: "Remo con mancuerna", sets: 3, reps: "10" },
          { id: "e12", name: "Fondos en paralelas", sets: 3, reps: "10-12" },
        ],
      },
      { day: "Sábado", isRest: true, exercises: [] },
      { day: "Domingo", isRest: true, exercises: [] },
    ],
  },
  {
    id: "plan-mobility",
    name: "Movilidad y Flexibilidad",
    description: "Rutina de movilidad articular y estiramientos",
    color: "cyan",
    icon: "stretch",
    createdAt: new Date().toISOString(),
    days: [
      {
        day: "Lunes",
        isRest: false,
        exercises: [
          { id: "m1", name: "Movilidad de hombros", duration: "5 min" },
          { id: "m2", name: "Cat-Cow", sets: 3, reps: "10" },
          { id: "m3", name: "Estiramiento de psoas", duration: "2 min por lado" },
        ],
      },
      {
        day: "Martes",
        isRest: false,
        exercises: [
          { id: "m4", name: "Foam rolling espalda", duration: "5 min" },
          { id: "m5", name: "90/90 Hip stretch", duration: "3 min por lado" },
          { id: "m6", name: "Movilidad de tobillo", duration: "3 min" },
        ],
      },
      {
        day: "Miércoles",
        isRest: true,
        exercises: [],
      },
      {
        day: "Jueves",
        isRest: false,
        exercises: [
          { id: "m7", name: "World's greatest stretch", sets: 3, reps: "5 por lado" },
          { id: "m8", name: "Movilidad de cadera", duration: "5 min" },
          { id: "m9", name: "Estiramiento de isquiotibiales", duration: "3 min" },
        ],
      },
      {
        day: "Viernes",
        isRest: false,
        exercises: [
          { id: "m10", name: "Movilidad torácica", duration: "5 min" },
          { id: "m11", name: "Estiramiento de pectoral", duration: "2 min por lado" },
          { id: "m12", name: "Yoga flow", duration: "10 min" },
        ],
      },
      { day: "Sábado", isRest: true, exercises: [] },
      { day: "Domingo", isRest: true, exercises: [] },
    ],
  },
]

type StoreState = {
  plans: TrainingPlan[]
}

let state: StoreState = {
  plans: DEFAULT_PLANS,
}

const listeners = new Set<() => void>()

function emitChange() {
  for (const listener of listeners) {
    listener()
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function getSnapshot(): StoreState {
  return state
}

export function useTrainingStore() {
  const storeState = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)

  return {
    plans: storeState.plans,

    addPlan(plan: Omit<TrainingPlan, "id" | "createdAt" | "days">) {
      const newPlan: TrainingPlan = {
        ...plan,
        id: `plan-${generateId()}`,
        createdAt: new Date().toISOString(),
        days: DAYS_OF_WEEK.map((day) => ({ day, exercises: [], isRest: true })),
      }
      state = { ...state, plans: [...state.plans, newPlan] }
      emitChange()
      return newPlan
    },

    updatePlan(planId: string, updates: Partial<Pick<TrainingPlan, "name" | "description" | "color" | "icon">>) {
      state = {
        ...state,
        plans: state.plans.map((p) =>
          p.id === planId ? { ...p, ...updates } : p
        ),
      }
      emitChange()
    },

    deletePlan(planId: string) {
      state = { ...state, plans: state.plans.filter((p) => p.id !== planId) }
      emitChange()
    },

    updateDayPlan(planId: string, day: DayOfWeek, dayPlan: Partial<DayPlan>) {
      state = {
        ...state,
        plans: state.plans.map((p) => {
          if (p.id !== planId) return p
          return {
            ...p,
            days: p.days.map((d) =>
              d.day === day ? { ...d, ...dayPlan } : d
            ),
          }
        }),
      }
      emitChange()
    },

    addExercise(planId: string, day: DayOfWeek, exercise: Omit<Exercise, "id">) {
      const newExercise: Exercise = { ...exercise, id: `ex-${generateId()}` }
      state = {
        ...state,
        plans: state.plans.map((p) => {
          if (p.id !== planId) return p
          return {
            ...p,
            days: p.days.map((d) => {
              if (d.day !== day) return d
              return { ...d, isRest: false, exercises: [...d.exercises, newExercise] }
            }),
          }
        }),
      }
      emitChange()
    },

    removeExercise(planId: string, day: DayOfWeek, exerciseId: string) {
      state = {
        ...state,
        plans: state.plans.map((p) => {
          if (p.id !== planId) return p
          return {
            ...p,
            days: p.days.map((d) => {
              if (d.day !== day) return d
              const exercises = d.exercises.filter((e) => e.id !== exerciseId)
              return { ...d, exercises, isRest: exercises.length === 0 }
            }),
          }
        }),
      }
      emitChange()
    },

    getTodayWorkouts() {
      const todayIndex = new Date().getDay()
      const todayName = DAY_INDEX_MAP[todayIndex]
      return storeState.plans
        .map((plan) => {
          const dayPlan = plan.days.find((d) => d.day === todayName)
          return {
            plan,
            dayPlan: dayPlan || { day: todayName, exercises: [], isRest: true },
          }
        })
        .filter(({ dayPlan }) => !dayPlan.isRest && dayPlan.exercises.length > 0)
    },

    getTodayName(): DayOfWeek {
      return DAY_INDEX_MAP[new Date().getDay()]
    },
  }
}
