import type { postState } from "./evidences.ts";

export interface PostType {
  id: number;
  title: string;
  content: string;
  imageUri: string;
  status: postState;
  categoryName: string;
}
