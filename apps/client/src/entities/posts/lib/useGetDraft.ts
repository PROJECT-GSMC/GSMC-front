import { useQuery } from "@tanstack/react-query";

import type { DraftResponse } from "../model/draft";

import { getDraft } from "@/views/posts/api/getDraft";

export const useGetDraft = () => {
  return useQuery<DraftResponse>({
    queryKey: ["drafts"],
    queryFn: getDraft,
  });
};
