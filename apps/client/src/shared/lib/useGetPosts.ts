import type { EvidenceType, PostType } from "@repo/types/evidences";
import { useQuery } from "@tanstack/react-query";

import { getPosts } from "../api/getPosts";

export const useGetPosts = (type: EvidenceType | "DRAFT") => {
  const query = useQuery({
    queryKey: ["posts", type],
    queryFn: () => getPosts(type as EvidenceType),
    enabled: type !== "DRAFT",
  });

  const posts: PostType[] = [
    ...(query.data?.data.majorActivityEvidence ?? []),
    ...(query.data?.data.humanitiesActivityEvidence ?? []),
    ...(query.data?.data.readingEvidence ?? []),
    ...(query.data?.data.otherEvidence ?? []),
  ];

  return {
    ...query,
    posts,
  };
};
