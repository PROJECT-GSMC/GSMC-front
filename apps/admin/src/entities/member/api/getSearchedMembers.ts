import instance from "@repo/api/axios";
import type { SearchParams } from "../model/search";

export const getSearchedMembers = async ({
  grade,
  classNumber,
  name,
  page = 1,
  size = 10,
}: SearchParams) => {
  const query: Record<string, string> = {};

  if (typeof grade != "undefined") query["grade"] = String(grade);
  if (typeof classNumber != "undefined")
    query["classNumber"] = String(classNumber);
  if (typeof name != "undefined") query["name"] = String(name);
  query["page"] = String(page);
  query["size"] = String(size);

  const queryString = new URLSearchParams(query).toString();

  return await instance.get(`/members/students/search?${queryString}`);
};
