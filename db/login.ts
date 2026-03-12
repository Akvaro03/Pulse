import { LoginDTO } from "@/src/features/auth/auth.schema";
import handleResponseAxios from "@/src/utils/handleResponseAxios";
import axiosClient from "./axios.client";

async function login(data: LoginDTO) {
  return axiosClient
    .post("/auth/login", data, {
      meta: {
        successMessage: "Se inicio session",
        errorMessage: "No se logro iniciar session",
      },
    })
    .catch((err) => {
      handleResponseAxios(err);
      throw err;
    });
}

export default login;
