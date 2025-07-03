import type { Draft, ActivityDraft, ReadingDraft } from "@repo/types/draft";
import type { Activity, Reading, Others } from "@repo/types/evidences";

const isActivity = (
  data: Activity | Reading | Others | Draft
): data is Activity | ActivityDraft => {
  return "imageUri" in data;
};

const isReading = (
  data: Activity | Reading | Others | Draft
): data is Reading | ReadingDraft => {
  return "author" in data;
};

const isOthers = (
  data: Activity | Reading | Others | Draft
): data is Others => {
  return !isActivity(data) && !isReading(data);
};

export { isActivity, isReading, isOthers };
