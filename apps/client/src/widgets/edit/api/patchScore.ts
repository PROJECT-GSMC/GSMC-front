import instance from "@repo/api/axios";

export const patchScore = async (evidenceId: number, formData: FormData) => {
  await instance.patch(`evidence/reading/${evidenceId}`, formData);
};
