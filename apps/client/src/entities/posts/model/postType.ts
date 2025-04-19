import { postState } from "../../../../../../packages/ui/src/types/evidences";

export interface PostType {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
  status: postState;
  categoryName: string;
}
