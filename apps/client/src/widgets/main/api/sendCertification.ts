import instance from "@repo/api/axios";

import type { Certification } from "../model/certification";

export const sendCertification = async (data: Certification) => {
  const formData = new FormData();
  formData.append("file", data.file);
  formData.append("name", data.name);
  formData.append("acquisitionDate", data.acquisitionDate);
  return await instance.post("certificates", formData);
};
