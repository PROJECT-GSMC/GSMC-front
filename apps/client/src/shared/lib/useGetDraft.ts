import type { DraftResponse } from "@repo/types/draft";
import { useQuery } from "@tanstack/react-query";

import { getDraft } from "../api/getDraft";

export const useGetDraft = () => {
  return useQuery<DraftResponse>({
    queryKey: ["drafts"],
    queryFn: getDraft,
  });
};
