import FormInstance from "../../../../../../packages/ui/src/formAxios";
import { Evidence } from "../model/evidence";

export const sendEvidence = async (data: Evidence) => {
  return await FormInstance.post("/evidence/current/other", {
    ...data,
  });
};
