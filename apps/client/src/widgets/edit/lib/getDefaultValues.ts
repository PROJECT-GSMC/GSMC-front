import type { ConfigType } from "@/shared/model/config";
import {
  HumanitiesOptions,
  MajorOptions,
} from "@/widgets/write/model/category";

import type { FormValues } from "../types/types";

export const getDefaultValues = (
  type: ConfigType,
  post: FormValues
): Partial<FormValues> => {
  switch (type) {
    case "major": {
      return {
        title: post.title,
        content: post.content,
        categoryName: MajorOptions.find(
          (option) => post.categoryName?.send === option.send
        ),
        file: post.file,
      };
    }
    case "humanities": {
      return {
        title: post.title,
        content: post.content,
        categoryName: HumanitiesOptions.find(
          (option) => post.categoryName?.send === option.send
        ),
        file: post.file,
      };
    }
    case "reading": {
      return {
        title: post.title,
        author: post.author,
        page: String(post.page),
        content: post.content,
      };
    }
    case "others": {
      return {
        file: post.file,
        value: post.value,
      };
    }
  }
};
