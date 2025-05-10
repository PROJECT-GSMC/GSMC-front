import { getPosts } from "@/views/posts/api/getPosts";
import { useQuery } from "@tanstack/react-query";
import { EvidenceType } from "node_modules/@repo/ui/src/types/evidences";

export const useGetPosts = ({ type }: { type: EvidenceType }) => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: () => getPosts(type),
  });
};
