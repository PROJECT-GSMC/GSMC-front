import type { EvidenceType } from "@repo/types/evidences";
import { useQuery } from "@tanstack/react-query";

import { getDraft } from "../api/getDraft";

export const useGetDraft = (type: EvidenceType | "DRAFT" | null) => {
  return useQuery({
    queryKey: ["drafts", type],
    queryFn: getDraft,
    enabled: type == "DRAFT",
  });
};
