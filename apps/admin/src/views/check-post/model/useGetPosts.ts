import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../api/getPosts";
import { PostType } from "@repo/types/postType";
import { postState } from "@repo/types/evidences";

export const useGetPosts = (email: string, status: postState) => {
  return useQuery<PostType[], Error>({
    queryKey: ["posts", email, status],
    queryFn: () => getPosts(email, status),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
};
