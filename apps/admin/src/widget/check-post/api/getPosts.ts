import instance from "../../../../../../packages/ui/src/axios";
import { ReviewState } from "../model/reviewState";

export const getPosts = async (email: string, status: ReviewState) => {
  instance.get(`/evidence/${email}?status=${status}`);
};
