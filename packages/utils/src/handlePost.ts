import type { Activity, Others, Reading } from "@repo/types/evidences";

const isActivity = (data: Activity | Reading | Others): data is Activity => {
  return "imageUri" in data;
};

const isReading = (data: Activity | Reading | Others): data is Reading => {
  return "author" in data;
};

const isOthers = (data: Activity | Reading | Others): data is Others => {
  return !isActivity(data) && !isReading(data);
};

export { isActivity, isReading, isOthers };
