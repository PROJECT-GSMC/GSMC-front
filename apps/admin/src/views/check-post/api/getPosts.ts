import instance from "@repo/api/axios";
import type { EvidenceResponse, postState } from "@repo/types/evidences";

export const getPosts = async (
  email: string,
  status: postState | null
): Promise<EvidenceResponse> => {
  return await instance.get(
    `/evidence/${email.split("@")[0]?.slice(1)}?status=${status}`
  );
};
