// api/axiosClient.ts
import axios from "axios";
import { toast } from "sonner";

const axiosClient = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

axiosClient.interceptors.response.use(
  (response) => {
    const successMessage = response.config?.meta?.successMessage;

    if (successMessage) {
      toast.success(successMessage);
    }

    return response;
  },
  (error) => {
    const errorMessage =
      error.config?.meta?.errorMessage ||
      error.response?.data?.message ||
      "Error en la petición";

    toast.error(errorMessage);

    return Promise.reject(error);
  }
);

declare module "axios" {
  export interface AxiosRequestConfig {
    meta?: {
      successMessage?: string;
      errorMessage?: string;
    };
  }
}
export default axiosClient;