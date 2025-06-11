import instance from "@repo/api/axios";
import type { Member } from "@repo/types/member";
import type { AxiosResponse } from "axios";

import type { SearchParams } from "../model/search";

interface SearchResponse {
  data: Member[];
}

export const getSearchedMembers = async ({
  grade,
  classNumber,
  name,
  page = 1,
  size = 10,
}: SearchParams): Promise<AxiosResponse<SearchResponse>> => {
  const query: Record<string, string> = {};

  if (grade !== undefined) query["grade"] = String(grade);
  if (classNumber !== undefined) query["classNumber"] = String(classNumber);
  if (name !== undefined) query["name"] = String(name);
  query["page"] = String(page);
  query["size"] = String(size);

  const queryString = new URLSearchParams(query).toString();

  return await instance.get(`/members/students/search?${queryString}`);
};
