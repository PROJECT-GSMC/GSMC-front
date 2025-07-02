import type { Activity, Reading, Others } from "@repo/types/evidences";

import { getEditConfig } from "../model/editConfig";
import type { FormValues } from "../types/types";

export const getDefaultValues = (
  type: "major" | "humanities" | "reading" | "others",
  post: Activity | Reading | Others
): Partial<FormValues> => {
  const config = getEditConfig(type);

  if (type === "reading" && "author" in post) {
    return {
      title: post.title,
      author: post.author,
      page: String(post.page),
      content: post.content,
    };
  }

  if (
    (type === "major" || type === "humanities") &&
    "title" in post &&
    "content" in post &&
    "categoryName" in post
  ) {
    const defaultCategory =
      config.categoryOptions?.find(
        (option) => option.send === post.categoryName
      ) ?? config.categoryOptions?.[0];

    return {
      title: post.title,
      content: post.content,
      categoryName: defaultCategory,
      file: undefined,
    };
  }

  return {};
};
