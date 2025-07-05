export type ActivityType = "MAJOR" | "HUMANITIES";

export interface ActivityDraft {
  draftId: string;
  title: string;
  content: string;
  imageUri?: string;
  categoryName: string;
  activityType: ActivityType;
}

export interface ReadingDraft {
  draftId: string;
  title: string;
  content: string;
  author: string;
  page: number;
}

export type DraftType = ActivityDraft | ReadingDraft;

export interface DraftResponse {
  activityEvidences: ActivityDraft[];
  readingEvidences: ReadingDraft[];
}
