import instance from "@repo/api/axios";

export const updateMajorActivity = async (evidenceId: number, activity: FormData) => {
  await instance.patch(`evidence/current/major/${evidenceId}`, activity);
};

export const updateHumanitiesActivity = async (evidenceId: number, activity: FormData) => {
  await instance.patch(`evidence/current/humanities/${evidenceId}`, activity);
}; 