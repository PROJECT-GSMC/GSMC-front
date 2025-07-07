import type { DraftType } from "@repo/types/draft";
import type { EvidenceType } from "@repo/types/evidences";
import { useQuery } from "@tanstack/react-query";

import { getDraft } from "../api/getDraft";

export const useGetDraft = (type: EvidenceType | "DRAFT" | null) => {
  const query = useQuery({
    queryKey: ["drafts", type],
    queryFn: getDraft,
    enabled: type == "DRAFT",
  });

  const drafts: DraftType[] = [
    ...(query.data?.data.activityEvidences ?? []),
    ...(query.data?.data.readingEvidences ?? []),
  ];

  return {
    ...query,
    drafts,
  };
};
