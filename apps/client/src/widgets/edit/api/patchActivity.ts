import instance from "@repo/api/axios";
import type { AxiosError, AxiosResponse } from "axios";

export const patchMajorActivity = async (
  evidenceId: number,
  activity: FormData
): Promise<AxiosResponse | AxiosError> => {
  try {
    const res = await instance.patch(`evidence/major/${evidenceId}`, activity);
    return res;
  } catch (error) {
    return error as AxiosError;
  }
};

export const patchHumanitiesActivity = async (
  evidenceId: number,
  activity: FormData
): Promise<AxiosError | AxiosResponse> => {
  try {
    const res = await instance.patch(
      `evidence/humanities/${evidenceId}`,
      activity
    );
    return res;
  } catch (error) {
    return error as AxiosError;
  }
};
