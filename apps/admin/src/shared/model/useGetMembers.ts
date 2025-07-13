import type { Member } from "@repo/types/member";
import { useQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

import { getMembers } from "../api/getMembers";

export const useGetMembers = () => {
  return useQuery<AxiosResponse<Member[]>>({
    queryKey: ["members"],
    queryFn: getMembers,
  });
};
