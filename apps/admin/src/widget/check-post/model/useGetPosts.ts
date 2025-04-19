import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getPosts } from "../api/getPosts";
import { PostType } from "../../../../../../packages/ui/src/types/postType";
import { postState } from "../../../../../../packages/ui/src/types/evidences";

interface PostParams {
  email: string;
  status: postState;
}

export const useGetPosts = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email, status }: PostParams) => getPosts(email, status),
    onSuccess: (data: PostType[]) => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
      return data;
    },
    onError: (error: Error) => {
      throw error;
    },
  });
};
