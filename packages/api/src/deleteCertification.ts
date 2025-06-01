import { axiosInstance } from "./axios.ts";

const removeCertification = async (id: string | number) => {
  return axiosInstance.delete(`/certificates/current/${id}`);
};

export { removeCertification };
