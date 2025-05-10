import { getPosts } from "@/views/posts/api/getPosts";
import { useQuery } from "@tanstack/react-query";

export const useGetPosts = ({ type }: { type: string }) => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: () => getPosts(type),
  });
};
