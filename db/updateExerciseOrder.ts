import { UpdateExerciseOrderDTO } from "@/src/features/plans/plans.schema";
import axios from "axios";

async function UpdateExerciseOrder(exerciseOrder: UpdateExerciseOrderDTO) {
  return axios
    .post("/api/exercise/editOrder", exerciseOrder)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error adding plan:", err);
      throw err;
    });
}

export default UpdateExerciseOrder;