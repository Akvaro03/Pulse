import { RegisterDTO } from "@/src/features/auth/auth.schema";
import handleResponseAxios from "@/src/utils/handleResponseAxios";
import axiosClient from "./axios.client";

async function register(data: RegisterDTO) {
  return axiosClient
    .post("/auth/register", data, {
      meta: {
        successMessage: "Se creo la cuenta",
        errorMessage: "No se logro crear la cuenta",
      },
    })
    .catch((err) => {
      handleResponseAxios(err);
      throw err;
    });
}

export default register;
