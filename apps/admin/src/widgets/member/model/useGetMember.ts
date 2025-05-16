import { useQuery } from "@tanstack/react-query";
import { getSearchedMembers } from "@/entities/member/api/getSearchedMembers";
import { SearchParams } from "@/entities/member/model/search";

export const useGetMember = ({ grade, classNumber, name }: SearchParams) => {
  return useQuery({
    queryKey: ["members"],
    queryFn: () => getSearchedMembers({ grade, classNumber, name }),
  });
};
