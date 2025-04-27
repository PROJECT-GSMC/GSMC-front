import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postSignup } from "../api/postSignup";
import { SignupFormProps } from "@shared/model/AuthForm";

export const usePostSignup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (form: SignupFormProps) => postSignup(form),
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
