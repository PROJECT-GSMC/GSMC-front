import instance from "node_modules/@repo/ui/src/axios";

export const sendScore = async (
  categoryName: string,
  value: number | string,
  file: File
) => {
  const formData = new FormData();
  formData.append("categoryName", categoryName);
  formData.append("value", value.toString());
  formData.append("file", file);

  return await instance.post("/evidence/current/scoring", formData);
};
