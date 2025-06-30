import { sendScore } from "@/shared/api/sendScore";
import { majorCategoryOptions } from "@/widgets/calculate/model/category";
import type { FormValues } from "@/widgets/edit/types/types";
import { CharacterCategory } from "@/widgets/write/model/category";

import { handleSubmitBook } from "../lib/handleBookSubmit";
import { handleSubmitActivity } from "../lib/handleSubmitActivity";

import { foreignOptions } from "./foreignOptions";

interface Config {
  title: string;
  categoryOptions?: { name: string; send: string }[];
  onSubmit: (data: FormValues, type: "draft" | "submit") => Promise<void>;
}

export const getWriteConfig = (
  type: "major" | "humanities" | "reading" | "others" | "foreign"
): Config => {
  switch (type) {
    case "major": {
      return {
        title: "전공 영역",
        categoryOptions: majorCategoryOptions,
        onSubmit: async (data: FormValues, type) => {
          const formData = new FormData();
          if (data.file) {
            formData.append("file", data.file);
          }
          if (data.draftId != null) {
            formData.append("draftId", data.draftId);
          }
          formData.append("categoryName", data.categoryName?.send ?? "");
          formData.append("title", data.title || "");
          formData.append("content", data.content || "");
          formData.append("activityType", "MAJOR");

          await handleSubmitActivity(type, formData);
        },
      };
    }
    case "humanities": {
      return {
        title: "인성 영역",
        categoryOptions: CharacterCategory,
        onSubmit: async (data: FormValues, type) => {
          const formData = new FormData();
          if (data.file) {
            formData.append("file", data.file);
          }
          if (data.draftId != null) {
            formData.append("draftId", data.draftId);
          }
          formData.append("categoryName", data.categoryName?.send ?? "");
          formData.append("title", data.title || "");
          formData.append("content", data.content || "");
          formData.append("activityType", "HUMANITIES");

          await handleSubmitActivity(type, formData);
        },
      };
    }
    case "reading": {
      return {
        title: "독서 영역",
        onSubmit: async (data: FormValues, type) => {
          const bookData = {
            title: data.title || "",
            author: data.author ?? "",
            page: Number(data.page) || 0,
            content: data.content || "",
            draftId: data.draftId ?? null,
          };
          await handleSubmitBook(bookData, type);
        },
      };
    }
    case "others": {
      return {
        title: "기타 증빙 자료",
        onSubmit: async () => {
          // No submission logic implemented for 'others' category yet.
        },
      };
    }
    case "foreign": {
      return {
        title: "외국어 영역",
        categoryOptions: foreignOptions,
        onSubmit: async (data: FormValues) => {
          const formData = new FormData();
          if (data.file) {
            formData.append("file", data.file);
          }
          formData.append("categoryName", data.categoryName?.send ?? "");
          formData.append("value", data.title || "");
          await sendScore(formData);
        },
      };
    }
  }
};
