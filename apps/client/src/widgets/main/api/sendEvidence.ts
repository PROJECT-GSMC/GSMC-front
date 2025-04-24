import FormInstance from "../../../../../../packages/ui/src/formAxios";
import { Evidence } from "../model/evidence";

export const sendEvidence = async (data: Evidence) => {
  const formData = new FormData();
  formData.append("file", data.file);
  formData.append("categoryName", data.categoryName);
  return await FormInstance.post("/evidence/current/other", {
    ...data,
  });
};
