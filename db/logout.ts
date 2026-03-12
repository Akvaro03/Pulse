import handleResponseAxios from "@/src/utils/handleResponseAxios";
import axiosClient from "./axios.client";

async function Logout() {
  return axiosClient
    .post(
      "/auth/logout",
      {},
      {
        meta: {
          successMessage: "Se cerro la session",
          errorMessage: "No se logro cerrar la session",
        },
      },
    )
    .catch((err) => {
      handleResponseAxios(err);
      throw err;
    });
}

export default Logout;
