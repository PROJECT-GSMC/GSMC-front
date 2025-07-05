import type { Draft, ActivityDraft, ReadingDraft } from "@repo/types/draft";
import type { Activity, Reading, Others } from "@repo/types/evidences";

interface MockPostFlag {
  __isMock: true;
}

export type MockPost = (Activity | Reading | Others) & MockPostFlag;

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

const isMockPost = (data: unknown): data is MockPost => {
  return typeof data === "object" && data !== null && "__isMock" in data;
};

export { isActivity, isReading, isOthers, isMockPost };
