import type { Activity, Reading } from "@repo/types/evidences";

export interface DraftResponse {
  activityEvidences: Draft[];
  readingEvidences: Draft[];
}
type ActivityDraft = Omit<Activity, "id"> & { draftId: string };

type ReadingDraft = Omit<Reading, "id"> & { draftId: string };

export type Draft = ActivityDraft | ReadingDraft;
