import type { DraftType, ActivityDraft, ReadingDraft } from "@repo/types/draft";
import type {
  Activity,
  Reading,
  Others,
  PostType,
} from "@repo/types/evidences";

function isDraft(data: PostType | DraftType): data is DraftType {
  return typeof data === "object" && "draftId" in data;
}

function isPost(data: PostType | DraftType): data is PostType {
  return typeof data === "object" && "id" in data;
}

function isActivity(
  data: PostType | DraftType
): data is Activity | ActivityDraft {
  return "imageUri" in data;
}

function isReading(data: PostType | DraftType): data is Reading | ReadingDraft {
  return "author" in data;
}

function isOthers(data: PostType | DraftType): data is Others {
  return !isActivity(data) && !isReading(data);
}

export { isDraft, isPost, isActivity, isReading, isOthers };
