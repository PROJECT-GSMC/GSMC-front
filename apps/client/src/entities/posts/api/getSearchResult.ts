import axios from "axios";

export const getSearchResult = async (query: string, type?: string) => {
  return axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/evidence/search?query=${query}$type=${type}`
  );
};
