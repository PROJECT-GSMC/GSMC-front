import instance from "@repo/api/axios";
import { isAxiosError } from "axios";

import type { CertificationResponse } from "@/shared/model/certification";

interface Certifications {
  certificates: CertificationResponse[];
}

export const getCertification = async (): Promise<Certifications> => {
  try {
    const response = await instance.get<Certifications>(
      "/certificates/current"
    );
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      throw error.response.data ?? "자격증 취득 실패";
    }
    throw error;
  }
};
