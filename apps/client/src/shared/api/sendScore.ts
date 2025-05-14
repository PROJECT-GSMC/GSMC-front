import instance from "node_modules/@repo/ui/src/axios";

export const sendScore = async (
  categoryName: string,
  value: number,
  file: File
) => {
  const formData = new FormData();
  formData.append("categoryName", categoryName);
  formData.append("value", String(value));
  formData.append("file", file);

  return await instance.post("/evidence/current/scoring", formData);
};
