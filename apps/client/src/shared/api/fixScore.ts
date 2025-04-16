import instance from "../../../../../packages/ui/src/axios";

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
