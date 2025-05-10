import { Certification } from "../model/certification";
import instance from "node_modules/@repo/ui/src/axios";

export const sendCertification = async (data: Certification) => {
  const formData = new FormData();
  formData.append("file", data.file);
  formData.append("name", data.name);
  formData.append("acquisitionDate", data.acquisitionDate);
  return await instance.post("certificates", formData);
};
