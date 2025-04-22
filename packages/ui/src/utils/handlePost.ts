import { Activity, Others, Reading } from "../types/evidences";

export const isActivity = (
  data: Activity | Reading | Others
): data is Activity => {
  return data && "imageUrl" in data;
};

export const isReading = (
  data: Activity | Reading | Others
): data is Reading => {
  return data && "author" in data;
};

export const isOthers = (data: Activity | Reading | Others): data is Others => {
  return data && !isActivity(data) && !isReading(data);
};
