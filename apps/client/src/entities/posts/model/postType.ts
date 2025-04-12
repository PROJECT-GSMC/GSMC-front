import { postState } from "../../../../../../packages/ui/src/types/postState";

export interface PostType {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
  status: postState;
  categoryName: string;
}
