import instance from "../../../../../../packages/ui/src/axios";

export const getSearchResult = async (query: string, type?: string) => {
  return instance.get(`/evidence/search?query=${query}$type=${type}`);
};
