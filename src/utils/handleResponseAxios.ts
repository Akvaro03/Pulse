import { AxiosResponse } from "axios";
import { toast } from "sonner";

const handleResponseAxios = (response: AxiosResponse) => {
  if (response.status === 200) {
    toast.success("Se cerro sesion");
    return response.data
  } else {
    toast.error("Error logout:");
    console.log(response.data);
  }
};

export default handleResponseAxios;
