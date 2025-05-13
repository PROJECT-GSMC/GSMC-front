import { getPosts } from "@/views/posts/api/getPosts";
import { useQuery } from "@tanstack/react-query";
import { EvidenceType } from "node_modules/@repo/ui/src/types/evidences";

export const useGetPosts = (type: EvidenceType | null) => {
  return useQuery({
    queryKey: ["posts", type],
    queryFn: () => getPosts(type),
  });
};
