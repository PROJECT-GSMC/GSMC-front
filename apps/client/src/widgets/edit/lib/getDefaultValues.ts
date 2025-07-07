import type { DraftType } from "@repo/types/draft";
import type { PostType } from "@repo/types/evidences";
import { isActivity, isReading } from "@repo/utils/handlePost";

import type { ConfigType } from "@/shared/model/config";
import type { FormValues } from "@/shared/model/formValues";
import {
  HumanitiesOptions,
  MajorOptions,
} from "@/widgets/write/model/category";

export const getDefaultValues = (
  type: ConfigType,
  post: PostType | DraftType | undefined
): Partial<FormValues> => {
  if (!post) return {};
  switch (type) {
    case "major":
    case "humanities": {
      if (isActivity(post)) {
        const categoryOptions =
          type === "major" ? MajorOptions : HumanitiesOptions;
        return {
          title: post.title,
          content: post.content,
          categoryName: categoryOptions.find(
            (option) => post.categoryName === option.send
          ),
        };
      }
      break;
    }

    case "reading": {
      if (isReading(post)) {
        return {
          title: post.title,
          author: post.author,
          page: String(post.page),
          content: post.content,
        };
      }
      break;
    }

    case "others": {
      throw new Error("외국어 영역의 수정은 지원되지 않습니다,");
    }
  }
  return {};
};
