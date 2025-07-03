import type { Activity, Reading } from "@repo/types/evidences";

export interface DraftResponse {
  activityEvidences: Draft[];
  readingEvidences: Draft[];
}
export type ActivityDraft = Omit<Activity, "id"> & { draftId: string };

export type ReadingDraft = Omit<Reading, "id"> & { draftId: string };

export type Draft = ActivityDraft | ReadingDraft;
