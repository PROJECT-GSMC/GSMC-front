import instance from "@repo/api/axios";

export const updateOthers = async (evidenceId: number, formData: FormData) => {
  await instance.patch(`evidence/other/${evidenceId}`, formData);
}; 