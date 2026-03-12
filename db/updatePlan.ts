import axios from "axios";
import {UpdatePlanClientDTO} from "@/src/features/plans/plans.schema";

async function UpdatePlan( Plan: UpdatePlanClientDTO) {
  return axios
    .post("/api/plan/updatePlan", Plan)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error updating plan:", err);
      throw err;
    });
}

export default UpdatePlan;
