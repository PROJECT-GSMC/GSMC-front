import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getPosts } from "../api/getPosts";
import { ReviewState } from "./reviewState";

interface PostParams {
  email: string;
  status: ReviewState;
}

export const usetPosts = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email, status }: PostParams) => getPosts(email, status),
    onSuccess: (data) => {
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
