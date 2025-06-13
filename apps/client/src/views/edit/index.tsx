"use client";

import type { post as postType, Activity } from "@repo/types/evidences";
import { isActivity, isReading } from "@repo/utils/handlePost";
import { useParams } from "next/navigation";
import { toast } from "sonner";

import { useGetPosts } from "@/entities/posts/lib/useGetPosts";

import EditForm from "./ui/EditForm";

const EditView = () => {
  const params = useParams();
  const { id } = params;
  const { data, isError } = useGetPosts(null);

  if (isError) {
    toast.error("게시물을 불러오지 못했습니다.");
  }

  const posts: postType[] = [
    ...(data?.data?.majorActivityEvidence ?? []),
    ...(data?.data?.humanitiesActivityEvidence ?? []),
    ...(data?.data?.readingEvidence ?? []),
    ...(data?.data?.otherEvidence ?? []),
  ];

  const post = posts.find((post) => post.id === Number(id));

  if (!post) {
    return <div>게시물을 찾을 수 없습니다.</div>;
  }

  const isMajorActivity =
    isActivity(post) &&
    data?.data?.majorActivityEvidence?.some((p: Activity) => p.id === post.id);

  const isHumanitiesActivity =
    isActivity(post) &&
    data?.data?.humanitiesActivityEvidence?.some(
      (p: Activity) => p.id === post.id
    );

  let type: "major" | "humanities" | "reading" | "others";
  if (isMajorActivity) {
    type = "major";
  } else if (isHumanitiesActivity) {
    type = "humanities";
  } else if (isReading(post)) {
    type = "reading";
  } else {
    type = "others";
  }

  return <EditForm post={post} type={type} />;
};

export default EditView;
