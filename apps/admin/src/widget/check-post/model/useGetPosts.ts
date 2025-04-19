import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getPosts } from "../api/getPosts";
import { ReviewState } from "./reviewState";
import { PostType } from "../../../../../client/src/entities/posts/model/postType";

interface PostParams {
  email: string;
  status: ReviewState;
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
