import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postSignin } from "../api/postSignin";
import { SignupFormProps } from "../../../shared/model/AuthForm";

export const usePostSignin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (form: SignupFormProps) => postSignin(form),
    onSuccess: (data) => {
      if (data.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
      }
      if (data.refreshToken) {
        localStorage.setItem("refreshToken", data.refreshToken);
      }

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
