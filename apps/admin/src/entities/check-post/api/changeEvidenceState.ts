import instance from "../../../../../../packages/ui/src/axios";
import { postState } from "../../../../../../packages/ui/src/types/evidences";

export const changeEvidenceState = async (
  evidenceId: number,
  status: postState
) => {
  return instance.patch(`/evidence/${evidenceId}/status`, status);
};
