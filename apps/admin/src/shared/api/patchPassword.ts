import instance from "@repo/api/axios";
import { isAxiosError } from "axios";

import type { ChangePasswordProps } from "../model/changePWForm";

export const patchPassword = async (form: ChangePasswordProps) => {
  try {
    const response = await instance.patch<{ success: boolean }>(
      `/auth/change-password`,
      form,
    );

    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw error.response.data ?? "비밀번호 변경 실패";
    }
    throw error;
  }
};
