import type { EvidenceType } from "@repo/types/evidences";
import { useQuery } from "@tanstack/react-query";

import { getPosts } from "../api/getPosts";

export const useGetPosts = (type: EvidenceType | "DRAFT") => {
  return useQuery({
    queryKey: ["posts", type],
    queryFn: () => getPosts(type as EvidenceType),
    enabled: type !== "DRAFT",
  });
};
