import { useQuery } from "@tanstack/react-query";

import { getDraft } from "@/views/posts/api/getDraft";

import type { DraftResponse } from "../model/draft";

export const useGetDraft = () => {
  return useQuery<DraftResponse>({
    queryKey: ["drafts"],
    queryFn: getDraft,
  });
};
