import instance from "node_modules/@repo/ui/src/axios";
import { EvidenceType } from "node_modules/@repo/ui/src/types/evidences";

export const getPosts = async (type: EvidenceType | null) => {
  return await instance.get(
    `/evidence/current${type === null ? "" : "?type=" + type}`
  );
};
