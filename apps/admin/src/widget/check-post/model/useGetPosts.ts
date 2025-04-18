import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getPosts } from "../api/getPosts";
import { ReviewState } from "./reviewState";

interface PostSignupParams {
  email: string;
  status: ReviewState;
}

export const usePostSignup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email, status }: PostSignupParams) =>
      getPosts(email, status),
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
