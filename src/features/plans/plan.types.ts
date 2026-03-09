import { Prisma } from "@/src/generated/prisma/client"

export type TrainingPlanFull =
  Prisma.training_planGetPayload<{
    include: {
      training_day: {
        include: {
          training_exercise: true
        }
      }
    }
  }>