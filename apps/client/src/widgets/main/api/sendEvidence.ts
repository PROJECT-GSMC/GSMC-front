import instance from "../../../../../../packages/ui/src/axios";
import { Evidence } from "../model/evidence";

export const sendEvidence = async (data: Evidence) => {
  return instance.post("/evidence/current/other", {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: {
      ...data,
    },
  });
};
