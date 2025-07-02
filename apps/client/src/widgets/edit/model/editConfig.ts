import type { ConfigType } from "@/shared/model/config";
import {
  foreignCategoryOptions,
  majorCategoryOptions,
} from "@/widgets/calculate/model/category";
import type { FormValues } from "@/widgets/edit/types/types";
import { CharacterCategory } from "@/widgets/write/model/category";

import {
  patchMajorActivity,
  patchHumanitiesActivity,
} from "../api/patchActivity";
import { patchReading } from "../api/patchReading";
import { patchScore } from "../api/patchScore";

interface Config {
  title: string;
  categoryOptions?: { name: string; send: string }[];
  onSubmit: (data: FormValues, id: number) => Promise<void>;
}

export const getEditConfig = (type: ConfigType): Config => {
  switch (type) {
    case "major": {
      return {
        title: "전공 영역 수정",
        categoryOptions: majorCategoryOptions,
        onSubmit: async (data: FormValues, id: number) => {
          const formData = new FormData();
          if (data.file) {
            formData.append("file", data.file);
          }
          formData.append("categoryName", data.categoryName?.send ?? "");
          formData.append("title", data.title || "");
          formData.append("content", data.content || "");
          formData.append("activityType", "MAJOR");

          await patchMajorActivity(id, formData);
        },
      };
    }
    case "humanities": {
      return {
        title: "인성 영역 수정",
        categoryOptions: CharacterCategory,
        onSubmit: async (data: FormValues, id: number) => {
          const formData = new FormData();
          if (data.file) {
            formData.append("file", data.file);
          }
          formData.append("categoryName", data.categoryName?.send ?? "");
          formData.append("title", data.title || "");
          formData.append("content", data.content || "");
          formData.append("activityType", "HUMANITIES");

          await patchHumanitiesActivity(id, formData);
        },
      };
    }
    case "reading": {
      return {
        title: "독서 영역 수정",
        onSubmit: async (data: FormValues, id: number) => {
          const bookData = {
            title: data.title || "",
            author: data.author ?? "",
            page: Number(data.page) || 0,
            content: data.content || "",
          };
          await patchReading(id, bookData);
        },
      };
    }
    case "foreign": {
      return {
        title: "외국어 영역 수정",
        categoryOptions: foreignCategoryOptions,
        onSubmit: async (data: FormValues, id: number) => {
          const formData = new FormData();
          if (data.file) {
            formData.append("file", data.file);
          }
          formData.append("value", String(data.value));
          await patchScore(id, formData);
        },
      };
    }
    case "others": {
      return {
        title: "기타 증빙 수정",
        onSubmit: async () => {
          // No submission logic implemented for 'others' category yet.
        },
      };
    }
  }
};
