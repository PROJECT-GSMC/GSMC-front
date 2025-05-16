import { useQuery } from "@tanstack/react-query";
import { getMembers } from "../api/getMembers";

export const useGetMember = () => {
  return useQuery({
    queryKey: ["members"],
    queryFn: getMembers,
  });
};
