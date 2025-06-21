import type { Activity, Reading } from "@repo/types/evidences";

export interface DraftResponse {
  activityEvidences: Draft[];
  readingEvidences: Draft[];
}
type ActivityDraft = Omit<Activity, "id"> & { draftId: number };

type ReadingDraft = Omit<Reading, "id"> & { draftId: number };

export type Draft = ActivityDraft | ReadingDraft;
