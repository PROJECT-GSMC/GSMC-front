import instance from "@repo/api/axios";

export const sendScore = async (formData: FormData) => {
  return await instance.post("/evidence/current/scoring", formData);
};
