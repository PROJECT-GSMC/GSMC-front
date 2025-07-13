import instance from "@repo/api/axios";
import { isAxiosError, type AxiosResponse } from "axios";

export const patchMajorActivity = async (
  evidenceId: number,
  activity: FormData
): Promise<AxiosResponse> => {
  try {
    const response = await instance.patch(
      `evidence/major/${evidenceId}`,
      activity
    );
    return response;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      throw error.response.data ?? "전공 영역 수정 실패";
    }
    throw error;
  }
};

export const patchHumanitiesActivity = async (
  evidenceId: number,
  activity: FormData
): Promise<AxiosResponse> => {
  try {
    const response = await instance.patch(
      `evidence/humanities/${evidenceId}`,
      activity
    );
    return response;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      throw error.response.data ?? "인성 영역 수정 실패";
    }
    throw error;
  }
};
