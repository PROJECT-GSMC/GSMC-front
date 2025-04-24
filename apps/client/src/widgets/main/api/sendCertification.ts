import instance from "../../../../../../packages/ui/src/axios";
import { Certification } from "../model/certification";

export const sendCertification = async (data: Certification) => {
  return await instance.post("/certificates", {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: {
      ...data,
    },
  });
};
