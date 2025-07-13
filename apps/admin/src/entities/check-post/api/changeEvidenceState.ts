import instance from "@repo/api/axios";
import type { PostStatus } from "@repo/types/evidences";

interface ChangeEvidenceStateResponse {
  status: number;
  message?: string;
}

export const changeEvidenceState = async (
  evidenceId: number,
  status: PostStatus
): Promise<ChangeEvidenceStateResponse> => {
  const response = await instance.patch<ChangeEvidenceStateResponse>(
    `/evidence/${evidenceId}/status`,
    { status }
  );
  return response;
};
