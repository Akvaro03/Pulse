import { DeleteExerciseDTO } from "@/src/features/exerciseTraining/plans.schema";
import axios from "axios";

async function DeleteExercise(data: DeleteExerciseDTO) {
  return axios
    .post("/api/exercise/deleteExercise", data)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error deleting exercise:", err);
      throw err;
    });
}

export default DeleteExercise;
