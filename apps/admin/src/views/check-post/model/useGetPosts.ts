import type { PostStatus } from "@repo/types/evidences";
import { useQuery } from "@tanstack/react-query";

import { getPosts } from "../api/getPosts";

export const useGetPosts = (email: string, status: PostStatus | null) => {
  return useQuery({
    queryKey: ["posts", email, status],
    queryFn: () => getPosts(email, status),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
};
