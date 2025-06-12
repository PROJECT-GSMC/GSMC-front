import type { Activity, Reading, Others } from "@repo/types/evidences";

export type Option = {
  name: string;
  send: string;
};

export type FormValues = {
  title: string;
  content: string;
  categoryName?: Option;
  file?: File;
  author?: string;
  page?: number;
  value?: string | number;
};

export type EditFormProps = {
  type: "major" | "humanities" | "reading" | "others" | "foreign";
  post: Activity | Reading | Others;
};
