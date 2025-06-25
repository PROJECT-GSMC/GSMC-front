import instance from "@repo/api/axios";
import type { EvidenceResponse, postState } from "@repo/types/evidences";
import type { AxiosResponse } from "axios";

export const getPosts = async (
  email: string,
  status: postState | null,
): Promise<AxiosResponse<EvidenceResponse>> => {
  return await instance.get<EvidenceResponse>(
    `/evidence/${decodeURIComponent(email).split("@")[0]?.slice(1)}?status=${status}`,
  );
};
