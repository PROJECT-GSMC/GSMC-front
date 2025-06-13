import type { post } from "@repo/types/evidences";
import { useQuery } from "@tanstack/react-query";

import { getDraft } from "@/views/posts/api/getDraft";

interface DraftResponse {
  activityEvidences: post[];
  readingEvidences: post[];
}

export const useGetDraft = () => {
  return useQuery<DraftResponse>({
    queryKey: ["drafts"],
    queryFn: getDraft,
  });
};
