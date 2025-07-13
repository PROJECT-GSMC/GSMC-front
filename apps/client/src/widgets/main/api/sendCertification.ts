import instance from "@repo/api/axios";
import { isAxiosError, type AxiosResponse } from "axios";

import type { CertificationRequest } from "@/shared/model/certification";

export const sendCertification = async (
  data: CertificationRequest
): Promise<AxiosResponse> => {
  try {
    const formData = new FormData();
    formData.append("file", data.file);
    formData.append("name", data.name);
    formData.append("acquisitionDate", data.acquisitionDate);
    return await instance.post("certificates", formData);
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw error.response.data ?? "자격증 등록 실패";
    }
    throw error;
  }
};
