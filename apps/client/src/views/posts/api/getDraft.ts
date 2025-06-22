import instance from "@repo/api/axios";
import type { DraftResponse } from "@repo/types/draft";

export const getDraft = async () => {
  const response = await instance.get<DraftResponse>("/evidence/current/draft");
  return response.data;
};
