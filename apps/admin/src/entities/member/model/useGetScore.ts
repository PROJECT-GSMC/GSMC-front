import { useQuery } from "@tanstack/react-query";

import { getScore } from "../api/getScore";

import type { ScoreResponse } from "./score";

export const useGetScore = (id: string) => {
  return useQuery<ScoreResponse>({
    queryKey: ["score", id],
    queryFn: () => getScore(id),
    enabled: !!id,
  });
};
