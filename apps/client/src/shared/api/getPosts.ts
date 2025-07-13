import instance from "@repo/api/axios";
import type { PostResponse, EvidenceType } from "@repo/types/evidences";

export const getPosts = async (type: EvidenceType) => {
  return await instance.get<PostResponse>(`/evidence/current?type=${type}`);
};
