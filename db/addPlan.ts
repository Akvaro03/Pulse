import { AddPlanDTO } from "@/src/features/plans/plans.schema";
import axios from "axios";

async function AddPlan(Plan: AddPlanDTO) {
  return axios
    .post("/api/plan/addPlan", Plan)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error adding plan:", err);
      throw err;
    });
}

export default AddPlan;
