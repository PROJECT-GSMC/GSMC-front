import instance from "node_modules/@repo/ui/src/axios";

export const sendForeign = async (
  categoryName: string,
  value: number,
  file: File
) => {
  const formData = new FormData();
  formData.append("categoryName", categoryName);
  formData.append("value", value.toString());
  formData.append("file", file);

  await instance.post("/evidence/current/foreign", formData);
};
