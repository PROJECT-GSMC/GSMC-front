import axios from "axios";

export const featScore = async (
  email: string,
  category: string,
  score: number
) => {
  try {
    await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/score/${email}`,
      { categoryName: category, value: score },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
  } catch (error) {
    console.error("Error updating score:", error);
  }
};
