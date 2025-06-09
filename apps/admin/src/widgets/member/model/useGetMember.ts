import type { Member } from "@repo/types/member";
import { useQuery } from "@tanstack/react-query";

import { getMembers } from "../api/getMembers";

interface MembersResponse {
  data: {
    data: Member[];
  };
}

export const useGetMember = () => {
  return useQuery<MembersResponse>({
    queryKey: ["members"],
    queryFn: async () => {
      const response = await getMembers();
      return response;
    },
  });
};
