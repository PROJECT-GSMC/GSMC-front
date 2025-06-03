import instance from "./axios.js";

const removeCertification = async (id: string | number) => {
  return instance.delete(`/certificates/current/${id}`);
};

export default removeCertification;
