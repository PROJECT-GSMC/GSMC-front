import instance from "../axios";

export const removeCertification = async (id: string) => {
  return instance.delete(`/certificates/current/${id}`);
};
