import type { postState } from "@repo/types/evidences";
import { useQuery } from "@tanstack/react-query";

import { getPosts } from "../api/getPosts";

export const useGetPosts = (email: string, status: postState | null) => {
  return useQuery({
    queryKey: ["posts", email, status],
    queryFn: () => getPosts(email, status),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
};
