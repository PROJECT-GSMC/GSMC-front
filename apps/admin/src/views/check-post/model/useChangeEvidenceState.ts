import type { postState } from "@repo/types/evidences";
import { useCallback } from "react";
import { toast } from "sonner";

import { changeEvidenceState } from "@/entities/check-post/api/changeEvidenceState";

export function useChangeEvidenceState(postId: number) {
  const updatePostState = useCallback(
    async (state: postState) => {
      try {
        if (postId) {
          const res = await changeEvidenceState(postId, state);
          if (res.status === 204) {
            toast.success("게시글 상태가 변경되었습니다.");
          }
        }
      } catch {
        toast.error("게시글 상태 변경에 실패했습니다.");
      }
    },
    [postId]
  );

  const handlePostState = useCallback(
    (state: postState) => (e: React.MouseEvent) => {
      e.stopPropagation();
      void updatePostState(state);
    },
    [updatePostState]
  );

  return { handlePostState };
}
