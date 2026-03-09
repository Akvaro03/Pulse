import axios from "axios";
import {DeletePlanDTO} from "@/src/features/plans/plans.schema";

async function DeletePlan( Plan: DeletePlanDTO) {
  return axios
    .post("/api/plan/deletePlan", Plan)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error deleting plan:", err);
      throw err;
    });
}

export default DeletePlan;
