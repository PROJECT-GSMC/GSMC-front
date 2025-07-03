import type { AxiosResponse } from "axios";

import type { ConfigType } from "@/shared/model/config";
import type { FormValues } from "@/widgets/edit/types/types";
import {
  MajorOptions,
  HumanitiesOptions,
  ForeignOptions,
} from "@/widgets/write/model/category";

import {
  patchMajorActivity,
  patchHumanitiesActivity,
} from "../api/patchActivity";
import { patchReading } from "../api/patchReading";
import { patchScore } from "../api/patchScore";

interface Config {
  title: string;
  categoryOptions?: { name: string; send: string }[];
  onSubmit: (data: FormValues, id: number) => Promise<AxiosResponse>;
}

export const getEditConfig = (type: ConfigType): Config => {
  switch (type) {
    case "major": {
      return {
        title: "전공 영역 수정",
        categoryOptions: MajorOptions,
        onSubmit: async (data: FormValues, id: number) => {
          const formData = new FormData();
          if (data.file) {
            formData.append("file", data.file);
          }
          formData.append("categoryName", data.categoryName?.send ?? "");
          formData.append("title", data.title || "");
          formData.append("content", data.content || "");
          formData.append("activityType", "MAJOR");

          return await patchMajorActivity(id, formData);
        },
      };
    }
    case "humanities": {
      return {
        title: "인성 영역 수정",
        categoryOptions: HumanitiesOptions,
        onSubmit: async (data: FormValues, id: number) => {
          const formData = new FormData();
          if (data.file) {
            formData.append("file", data.file);
          }
          formData.append("categoryName", data.categoryName?.send ?? "");
          formData.append("title", data.title || "");
          formData.append("content", data.content || "");
          formData.append("activityType", "HUMANITIES");

          return await patchHumanitiesActivity(id, formData);
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
          return await patchReading(id, bookData);
        },
      };
    }
    case "foreign": {
      return {
        title: "외국어 영역 수정",
        categoryOptions: ForeignOptions,
        onSubmit: async (data: FormValues, id: number) => {
          const formData = new FormData();
          if (data.file) {
            formData.append("file", data.file);
          }
          formData.append("value", String(data.value));
          return await patchScore(id, formData);
        },
      };
    }
  }
};
