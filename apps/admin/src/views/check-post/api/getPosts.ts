import instance from "@repo/api/axios";
import type { EvidenceResponse, postState } from "@repo/types/evidences";

export const getPosts = async (email: string, status: postState | null) => {
  return await instance.get<EvidenceResponse>(
    `/evidence/${decodeURIComponent(email).split("@")[0]?.slice(1)}?status=${status}`
  );
};
