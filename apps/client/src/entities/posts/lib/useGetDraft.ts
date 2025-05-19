import { getDraft } from "@/views/posts/api/getDraft";
import { post } from "@repo/types/evidences";
import { useQuery } from "@tanstack/react-query";

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
