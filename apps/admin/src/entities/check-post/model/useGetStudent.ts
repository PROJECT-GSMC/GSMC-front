import { useQuery } from "@tanstack/react-query";
import { getStudent } from "../api/getStudent";
import { Member } from "@repo/types/member";

export const useGetStudent = (email: string) => {
  return useQuery<Member>({
    queryKey: ["student", email],
    queryFn: () => getStudent(email),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
};
