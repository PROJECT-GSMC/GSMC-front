import type { AxiosResponse } from "axios";

import type { ConfigType } from "@/shared/model/config";
import type { FormValues, Option } from "@/shared/model/formValues";
import {
  MajorOptions,
  HumanitiesOptions,
} from "@/widgets/write/model/category";

import {
  patchMajorActivity,
  patchHumanitiesActivity,
} from "../api/patchActivity";
import { patchReading } from "../api/patchReading";

interface Config {
  title: string;
  categoryOptions?: Option[];
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
    case "others": {
      throw new Error("외국어 영역의 수정은 지원되지 않습니다,");
    }
  }
};
