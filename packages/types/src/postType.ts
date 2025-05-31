import type { postState } from "./index.js";

export interface PostType {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
  status: postState;
  categoryName: string;
}
