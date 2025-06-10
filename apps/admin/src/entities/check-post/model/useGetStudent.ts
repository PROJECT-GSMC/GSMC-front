import type { Member } from "@repo/types/member";
import { useQuery } from "@tanstack/react-query";

import { getStudent } from "../api/getStudent";
import type { AxiosResponse } from "axios";

export const useGetStudent = (email: string) => {
  return useQuery<AxiosResponse<Member>>({
    queryKey: ["student", email],
    queryFn: () => getStudent(email),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
};
