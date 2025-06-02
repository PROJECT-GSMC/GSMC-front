import instance from "@repo/api/axios";

export const getSearchResult = async (query: string, type?: string) => {
  return instance.get(`/evidence/search?title=${query}&type=${type}`);
};
