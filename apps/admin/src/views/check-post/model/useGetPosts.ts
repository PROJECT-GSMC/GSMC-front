import type { PostStatus, PostType } from "@repo/types/evidences";
import { useQuery } from "@tanstack/react-query";

import { getPosts } from "../api/getPosts";

export const useGetPosts = (email: string, status: PostStatus) => {
  const query = useQuery({
    queryKey: ["posts", email, status],
    queryFn: () => getPosts(email, status),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
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
