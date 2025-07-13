import type { Member } from "@repo/types/member";
import { useQuery } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

import { getMember } from "../api/getMember";

export const useGetMember = (email: string) => {
  return useQuery<AxiosResponse<Member>>({
    queryKey: ["student", email],
    queryFn: () => getMember(email),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
};
