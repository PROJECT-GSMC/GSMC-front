import { CharacterCategory } from "@/views/humanity/model/category";
import { FormValues } from "@/widgets/edit/types/types";
import { foreignOptions } from "@/widgets/write/model/foreignOptions";
import { handleSubmitActivity } from "../lib/handleSubmitActivity";
import { handleSubmitBook } from "../lib/handleBookSubmit";
import { sendScore } from "@/shared/api/sendScore";
import { majorCategoryOptions } from "@/widgets/calculate/model/category";

type Config = {
  title: string;
  categoryOptions?: { name: string; send: string }[];
  onSubmit: (data: FormValues, type: "draft" | "submit") => Promise<void>;
};

export const getWriteConfig = (
  type: "major" | "humanities" | "reading" | "others" | "foreign"
): Config => {
  switch (type) {
    case "major":
      return {
        title: "전공 영역",
        categoryOptions: majorCategoryOptions,
        onSubmit: async (data: FormValues, type) => {
          const formData = new FormData();
          if (data.file) {
            formData.append("file", data.file);
          }
          formData.append("categoryName", data.categoryName?.send || "");
          formData.append("title", data.title || "");
          formData.append("content", data.content || "");
          formData.append("activityType", "MAJOR");

          await handleSubmitActivity(type, formData);
        },
      };
    case "humanities":
      return {
        title: "인성 영역",
        categoryOptions: CharacterCategory,
        onSubmit: async (data: FormValues, type) => {
          const formData = new FormData();
          if (data.file) {
            formData.append("file", data.file);
          }
          formData.append("categoryName", data.categoryName?.send || "");
          formData.append("title", data.title || "");
          formData.append("content", data.content || "");
          formData.append("activityType", "HUMANITIES");

          await handleSubmitActivity(type, formData);
        },
      };
    case "reading":
      return {
        title: "독서 영역",
        onSubmit: async (data: FormValues, type) => {
          const bookData = {
            title: data.title || "",
            author: data.author || "",
            page: Number(data.page) || 0,
            content: data.content || "",
          };
          await handleSubmitBook(bookData, type);
        },
      };
    case "others":
      return {
        title: "기타 증빙 자료",
        onSubmit: async () => {},
      };
    case "foreign":
      return {
        title: "외국어 영역",
        categoryOptions: foreignOptions,
        onSubmit: async (data: FormValues) => {
          const formData = new FormData();
          if (data.file) {
            formData.append("file", data.file);
          }
          formData.append("categoryName", data.categoryName?.send || "");
          formData.append("value", data.title || "");
          sendScore(formData);
        },
      };
  }
};
