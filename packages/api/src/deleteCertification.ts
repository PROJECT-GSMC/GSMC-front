import instance from "./axios.js";

export const removeCertification = async (id: string | number) => {
  return instance.delete(`/certificates/current/${id}`);
};
