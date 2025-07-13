import type { PostStatus } from "@repo/types/evidences";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { toast } from "sonner";

import { changeEvidenceState } from "@/entities/check-post/api/changeEvidenceState";

export function useChangeEvidenceStatus(postId: number) {
  const queryClient = useQueryClient();

  const updatePostState = useCallback(
    async (state: PostStatus) => {
      try {
        const res = await changeEvidenceState(postId, state);

        if (res.status === 204) {
          toast.success("게시글 상태가 변경되었습니다.");

          await queryClient.invalidateQueries({
            queryKey: ["posts"],
            exact: false,
          });
        }
      } catch {
        toast.error("게시글 상태 변경에 실패했습니다.");
      }
    },
    [postId, queryClient]
  );

  const handlePostState = useCallback(
    (state: PostStatus) => (e: React.MouseEvent) => {
      e.stopPropagation();
      void updatePostState(state);
    },
    [updatePostState]
  );

  return { handlePostState };
}
