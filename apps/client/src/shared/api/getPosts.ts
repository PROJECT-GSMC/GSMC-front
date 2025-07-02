import instance from "@repo/api/axios";
import type { EvidenceResponse, EvidenceType } from "@repo/types/evidences";

export const getPosts = async (type: EvidenceType | null) => {
  return await instance.get<EvidenceResponse>(
    `/evidence/current${type === null ? "" : "?type=" + type}`,
  );
};
