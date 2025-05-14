"use client";

import instance from "@repo/api/axios";

export const featScore = async (
  email: string,
  category: string,
  score: number
) => {
  try {
    await instance.patch(`/score/${email}`, {
      categoryName: category,
      value: score,
    });
  } catch (error) {
    console.error("Error updating score:", error);
  }
};
