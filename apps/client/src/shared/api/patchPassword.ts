import instance from "@repo/api/axios";
import { isAxiosError, type AxiosResponse } from "axios";

import type { ChangePasswordProps } from "../model/changePWForm";

export const patchPassword = async (
  form: ChangePasswordProps
): Promise<AxiosResponse> => {
  try {
    const response = await instance.patch(`/auth/change-password`, form);

    return response;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw error.response.data ?? "비밀번호 변경 실패";
    }
    throw error;
  }
};
