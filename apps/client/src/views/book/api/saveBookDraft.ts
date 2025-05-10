import instance from "node_modules/@repo/ui/src/axios";

export const saveBookDraft = async (data: FormData) => {
  return await instance.post("/evidence/current/draft/reading", data);
};
