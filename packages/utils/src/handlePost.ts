import { Activity, Others, Reading } from "@repo/types/evidences";

export const isActivity = (
  data: Activity | Reading | Others
): data is Activity => {
  return "imageUrl" in data;
};

export const isReading = (
  data: Activity | Reading | Others
): data is Reading => {
  return "author" in data;
};

export const isOthers = (data: Activity | Reading | Others): data is Others => {
  return !isActivity(data) && !isReading(data);
};
