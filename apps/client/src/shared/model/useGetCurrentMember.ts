import { useQuery } from "@tanstack/react-query";
import { getCurrentMember } from "../api/getCurrentMember";
import { getCookie } from "@repo/utils/getCookie";

export const useGetCurrentMember = () => {
  return useQuery({
    queryKey: ["member"],
    queryFn: getCurrentMember,
    enabled: getCookie("accessToken") !== null,
  });
};
