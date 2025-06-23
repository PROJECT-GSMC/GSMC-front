import type { EvidenceType } from "@repo/types/evidences";
import { useQuery } from "@tanstack/react-query";

import { getPosts } from "@/views/posts/api/getPosts";

export const useGetPosts = (type: EvidenceType | "DRAFT" | null) => {
  return useQuery({
    queryKey: ["posts", type],
    queryFn: () => getPosts(type as EvidenceType | null),
    enabled: type !== "DRAFT",
  });
};
