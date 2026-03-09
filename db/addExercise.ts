import { AddExerciseDTO } from "@/src/features/exerciseTraining/plans.schema";
import axios from "axios";

async function AddExercise(data: AddExerciseDTO) {
  return axios
    .post("/api/exercise/addExercise", data)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error adding exercise:", err);
      throw err;
    });
}

export default AddExercise;
