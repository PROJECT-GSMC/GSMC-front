import instance from "@repo/api/axios";

export const featScore = async (
  email: string,
  category: string,
  score: number
) => {
  return await instance.patch(`/score/${email.split("@")[0]?.substring(1)}`, {
    categoryName: category,
    value: score,
  });
};
