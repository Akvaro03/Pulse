import axios from "axios";
import {refreshSessionDTO} from "@/src/features/plans/plans.schema";

async function RefreshSession( Plan: refreshSessionDTO) {
  return axios
    .post("/api/auth/refresh", Plan)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error refresh Session:", err);
      throw err;
    });
}

export default RefreshSession;
