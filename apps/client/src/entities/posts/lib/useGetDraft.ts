import { getDraft } from "@/views/posts/api/getDraft";
import { post } from "@repo/types/evidences";
import { useQuery } from "@tanstack/react-query";

export const useGetDraft = () => {
  return useQuery<post[]>({
    queryKey: ["drafts"],
    queryFn: getDraft,
  });
};
