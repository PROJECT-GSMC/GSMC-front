import { useQuery } from "@tanstack/react-query";
import { getCurrentMember } from "../api/getCurrentMember";

export const useGetCurrentMember = () => {
  return useQuery({
    queryKey: ["member"],
    queryFn: getCurrentMember,
  });
};
