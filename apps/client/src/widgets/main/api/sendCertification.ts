import instance from "../../../../../../packages/ui/src/axios";
import { Certification } from "../model/certification";

export const sendCertification = async (data: Certification) => {
  return instance.post("/certificates", {
    headers: {
      "Content-Type": "mulitpart/form-data",
    },
    data: {
      ...data,
    },
  });
};
