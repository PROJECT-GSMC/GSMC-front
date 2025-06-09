import { useQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import type { Member } from "@repo/types/member";

import { getMembers } from "../api/getMembers";

interface MembersResponse {
  data: Member[];
}

export const useGetMember = () => {
  return useQuery<AxiosResponse<MembersResponse>>({
    queryKey: ["members"],
    queryFn: getMembers,
  });
};
