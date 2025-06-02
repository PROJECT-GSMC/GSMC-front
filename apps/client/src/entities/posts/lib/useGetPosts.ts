import { getPosts } from "@/views/posts/api/getPosts";
import { useQuery } from "@tanstack/react-query";
import { EvidenceType } from "@repo/types/evidences";

export const useGetPosts = (type: EvidenceType | "DRAFT" | null) => {
  return useQuery({
    queryKey: ["posts", type],
    queryFn: () => getPosts(type as EvidenceType | null),
    enabled: type !== "DRAFT",
  });
};
