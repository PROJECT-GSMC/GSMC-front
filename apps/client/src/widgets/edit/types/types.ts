import type { Draft } from "@repo/types/draft";
import type { post } from "@repo/types/evidences";

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
  page?: string;
  value?: string | number;
  draftId?: string;
}

export interface EditFormProps {
  type: "major" | "humanities" | "reading" | "others" | "foreign";
  post: post | Draft;
}
