import instance from "@repo/api/axios";
import type { AxiosError, AxiosResponse } from "axios";

export const updateOthers = async (
  evidenceId: number,
  formData: FormData,
): Promise<AxiosError | AxiosResponse> => {
  try {
    const res = await instance.patch(`evidence/other/${evidenceId}`, formData);
    return res;
  } catch (error) {
    return error as AxiosError;
  }
};
