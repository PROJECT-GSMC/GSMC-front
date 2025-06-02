import instance from "./axios.ts";

const removeCertification = async (id: string | number) => {
  return instance.delete(`/certificates/current/${id}`);
};

export { removeCertification };
