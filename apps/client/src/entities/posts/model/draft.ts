import type { post } from "@repo/types/evidences";

export interface DraftResponse {
  activityEvidences: post[];
  readingEvidences: post[];
}
