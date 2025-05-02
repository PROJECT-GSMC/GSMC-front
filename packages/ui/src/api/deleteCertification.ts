import instance from "../axios";

export const removeCertification = async (id: string | number) => {
  return instance.delete(`/certificates/current/${id}`);
};
