import instance from "@repo/api/axios";

interface FixScore {
  categoryName: string;
  score: number;
}

export const FixScore = ({ categoryName, score }: FixScore) => {
  return instance.patch("/score/current", {
    categoryName,
    score,
  });
};
