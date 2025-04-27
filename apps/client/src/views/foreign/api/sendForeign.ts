import FormInstance from "../../../../../../packages/ui/src/formAxios";

export const sendForeign = async (
  categoryName: string,
  value: number,
  file: File
) => {
  const formData = new FormData();
  formData.append("categoryName", categoryName);
  formData.append("value", value.toString());
  formData.append("file", file);

  await FormInstance.post("/evidence/current/foreign", formData);
};
