import { useQuery } from "@tanstack/react-query";
import { getStudent } from "../api/getStudent";

export const useGetPosts = (email: string) => {
  return useQuery({
    queryKey: ["posts", email],
    queryFn: () => getStudent(email),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
};
