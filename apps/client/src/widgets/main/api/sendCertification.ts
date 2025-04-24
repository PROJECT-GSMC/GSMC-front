import FormInstance from "../../../../../../packages/ui/src/formAxios";
import { Certification } from "../model/certification";

export const sendCertification = async (data: Certification) => {
  const formData = new FormData();
  formData.append("file", data.file);
  formData.append("name", data.name);
  formData.append("acquisitionDate", data.acquisitionDate);
  return await FormInstance.post("/certificates", {
    formData,
  });
};
