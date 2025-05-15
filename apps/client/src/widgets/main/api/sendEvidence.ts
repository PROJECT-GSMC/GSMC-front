import instance from "@repo/api/axios";
import { Evidence } from "../model/evidence";

export const sendEvidence = async (data: Evidence) => {
  const formData = new FormData();
  formData.append("file", data.file);
  formData.append("categoryName", data.option.send);
  return await instance.post("/evidence/current/other", formData);
};
