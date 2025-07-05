import type { AxiosResponse } from "axios";

import type { ConfigType } from "@/shared/model/config";
import type { FormValues, Option } from "@/widgets/edit/types/types";
import {
  MajorOptions,
  HumanitiesOptions,
  ForeignOptions,
} from "@/widgets/write/model/category";

import { postScoring } from "../api/postScoring";
import { handleSubmitActivity } from "../lib/handleSubmitActivity";
import { handleSubmitReading } from "../lib/handleSubmitReading";

interface Config {
  title: string;
  categoryOptions?: Option[];
  onSubmit: (
    data: FormValues,
    type: "draft" | "submit"
  ) => Promise<AxiosResponse>;
}

export const getWriteConfig = (type: ConfigType): Config => {
  switch (type) {
    case "major": {
      return {
        title: "전공 영역",
        categoryOptions: MajorOptions,
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

          return await handleSubmitActivity(type, formData);
        },
      };
    }
    case "humanities": {
      return {
        title: "인성 영역",
        categoryOptions: HumanitiesOptions,
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

          return await handleSubmitActivity(type, formData);
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
          return await handleSubmitReading(bookData, type);
        },
      };
    }
    case "others": {
      return {
        title: "외국어 영역",
        categoryOptions: ForeignOptions,
        onSubmit: async (data: FormValues) => {
          const formData = new FormData();
          if (data.file) {
            formData.append("file", data.file);
          }
          formData.append("categoryName", data.categoryName?.send ?? "");
          formData.append("value", String(data.value));
          return await postScoring(formData);
        },
      };
    }
  }
};
