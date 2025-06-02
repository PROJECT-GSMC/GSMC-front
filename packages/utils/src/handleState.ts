export const handleState = (state: string) => {
  if (state === "APPROVE") return "통과";
  if (state === "REJECT") return "탈락";
  if (state === "PENDING") return "대기중..";
  return "임시저장 글";
};

export const handleStateColor = (state: string) => {
  if (state === "APPROVE") return "text-tropicalblue-500";
  if (state === "REJECT") return "text-[#DF454A]";
  if (state === "PENDING") return "text-tropicalblue-800";
  return "text-gray-500";
};
