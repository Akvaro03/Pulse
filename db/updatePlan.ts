import axios from "axios";
import {UpdatePlanDTO } from "@/src/features/plans/plans.schema";

async function UpdatePlan( Plan: UpdatePlanDTO) {
  return axios
    .post("/api/plan/updatePlan", Plan)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error updating plan:", err);
      throw err;
    });
}

export default UpdatePlan;
