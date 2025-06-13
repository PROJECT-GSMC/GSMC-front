import type { Activity, Reading, Others } from "@repo/types/evidences";

export interface Option {
  name: string;
  send: string;
}

export interface FormValues {
  title: string;
  content: string;
  categoryName?: Option;
  file?: File;
  author?: string;
  page?: number;
  value?: string | number;
}

export interface EditFormProps {
  type: "major" | "humanities" | "reading" | "others" | "foreign";
  post: Activity | Reading | Others;
}
