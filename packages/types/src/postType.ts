import type { postState } from "./evidences.ts";

export interface PostType {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
  status: postState;
  categoryName: string;
}
