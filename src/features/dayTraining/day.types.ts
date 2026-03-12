import { Prisma } from "@/src/generated/prisma/client";

export type TrainingDayFull = Prisma.training_dayGetPayload<{
  include: {
    training_exercise: true;
  };
}>;
