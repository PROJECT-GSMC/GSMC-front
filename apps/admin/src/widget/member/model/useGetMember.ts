import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getMembers } from "../api/getMembers";

export const useGetMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: getMembers,
    onSuccess: (data) => {
      queryClient.setQueryData(["members"], data.data);
    },
    onError: (e) => {
      return e;
    },
  });
};
