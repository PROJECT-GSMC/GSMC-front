import { Activity, Reading, Others } from "@repo/types/evidences";

export type Option = {
  name: string;
  send: string;
}

export type FormValues = {
  title: string;
  content: string;
  categoryName?: Option;
  file?: File;
  author?: string;
  page?: string;
};

export type EditFormProps = {
  type: "major" | "humanities" | "reading" | "others";
  post: Activity | Reading | Others;
} 