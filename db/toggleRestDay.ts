import axios from "axios";

async function ToggleRestDay(data: {
  planId: number; 
  day: string;
  isRest: boolean;
}) {
  return axios
    .post("/api/plan/toggleRestDay", data)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error adding plan:", err);
      throw err;
    });
}

export default ToggleRestDay;
