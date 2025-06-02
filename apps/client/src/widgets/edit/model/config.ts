import { majorCategoryOptions } from "@/widgets/calculate/model/category";
import { CharacterCategory } from "@/widgets/write/model/category";
import {
  updateMajorActivity,
  updateHumanitiesActivity,
} from "@/shared/api/updateActivity";
import { updateReading } from "@/shared/api/updateReading";
import { FormValues } from "@/widgets/edit/types/types";

type Config = {
  title: string;
  categoryOptions?: { name: string; send: string }[];
  onSubmit: (data: FormValues, id: number) => Promise<void>;
};

export const getEditConfig = (
  type: "major" | "humanities" | "reading" | "others"
): Config => {
  switch (type) {
    case "major":
      return {
        title: "전공 영역 수정",
        categoryOptions: majorCategoryOptions,
        onSubmit: async (data: FormValues, id: number) => {
          const formData = new FormData();
          if (data.file) {
            formData.append("file", data.file);
          }
          formData.append("categoryName", data.categoryName?.send || "");
          formData.append("title", data.title || "");
          formData.append("content", data.content || "");
          formData.append("activityType", "MAJOR");

          await updateMajorActivity(id, formData);
        },
      };
    case "humanities":
      return {
        title: "인성 영역 수정",
        categoryOptions: CharacterCategory,
        onSubmit: async (data: FormValues, id: number) => {
          const formData = new FormData();
          if (data.file) {
            formData.append("file", data.file);
          }
          formData.append("categoryName", data.categoryName?.send || "");
          formData.append("title", data.title || "");
          formData.append("content", data.content || "");
          formData.append("activityType", "HUMANITIES");

          await updateHumanitiesActivity(id, formData);
        },
      };
    case "reading":
      return {
        title: "독서 영역 수정",
        onSubmit: async (data: FormValues, id: number) => {
          const bookData = {
            title: data.title || "",
            author: data.author || "",
            page: Number(data.page) || 0,
            content: data.content || "",
          };
          await updateReading(id, bookData);
        },
      };
    case "others":
      return {
        title: "기타 증빙 수정",
        onSubmit: async () => {},
      };
  }
};
