import instance from "@repo/api/axios";

import { SearchParams } from "../model/search";

export const getSearchedMembers = async ({
  grade,
  classNumber,
  name,
  page = 1,
  size = 10,
}: SearchParams) => {
  const query: Record<string, string> = {};

  if (grade != null) query.grade = String(grade);
  if (classNumber != null) query.classNumber = String(classNumber);
  if (name != null) query.name = String(name);
  if (page != null) query.page = String(page);
  if (size != null) query.size = String(size);

  const queryString = new URLSearchParams(query).toString();

  return instance.get(`/students/search?${queryString}`);
};
