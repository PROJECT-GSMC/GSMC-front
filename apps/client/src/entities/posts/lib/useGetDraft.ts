import { getDraft } from "@/views/posts/api/getDraft";
import { useQuery } from "@tanstack/react-query";

export const useGetDraft = () => {
  return useQuery({
    queryKey: ["drafts"],
    queryFn: getDraft,
  });
};
