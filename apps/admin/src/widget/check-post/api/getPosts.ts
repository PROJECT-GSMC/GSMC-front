import instance from "../../../../../../packages/ui/src/axios";
import { ReviewState } from "../model/reviewState";

export const getPosts = async (email: string, status: ReviewState) => {
  const response = await instance.get(`/evidence/${email}?status=${status}`);
  return response.data;
};
