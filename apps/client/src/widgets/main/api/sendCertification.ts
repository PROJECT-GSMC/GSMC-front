import FormInstance from "../../../../../../packages/ui/src/formAxios";
import { Certification } from "../model/certification";

export const sendCertification = async (data: Certification) => {
  return await FormInstance.post("/certificates", {
    ...data,
  });
};
