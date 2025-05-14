import instance from "@repo/api/axios";
import { postState } from "@repo/types/evidences";

export const changeEvidenceState = async (
  evidenceId: number,
  status: postState
) => {
  return await instance.patch(`/evidence/${evidenceId}/status`, status);
};
