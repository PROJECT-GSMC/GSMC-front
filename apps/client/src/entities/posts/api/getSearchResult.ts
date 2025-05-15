import instance from "@repo/api/axios";

export const getSearchResult = async (query: string, type?: string) => {
  return instance.get(`/evidence/search?query=${query}$type=${type}`);
};
