import axios from "axios";

export const getPosts = async () => {
  return await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/evidence/current`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );
};
