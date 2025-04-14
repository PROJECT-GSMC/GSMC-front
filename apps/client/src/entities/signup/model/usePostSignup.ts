import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postSignup } from "../api/postSignup";

export const usePostSignup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postSignup,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["auth"],
        exact: false,
      });
      return data;
    },
    onError: (error: Error) => {
      throw error;
    },
  });
};
