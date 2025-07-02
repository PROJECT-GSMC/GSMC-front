"use client";

import type { Draft } from "@repo/types/draft";
import type { post, Activity } from "@repo/types/evidences";
import { isActivity, isReading } from "@repo/utils/handlePost";
import { useParams, useSearchParams } from "next/navigation";
import { toast } from "sonner";

import { useGetDraft } from "@/shared/lib/useGetDraft";
import { useGetPosts } from "@/shared/lib/useGetPosts"
import EditForm from "@/widgets/edit/ui";

const EditView = () => {
  const params = useParams();
  const searchParams = useSearchParams();

  const { id } = params;
  const isDraft = searchParams.get("draft") === "true";

  const { data: postsData, isError: isPostsError } = useGetPosts(null);
  const { data: draftsData, isError: isDraftsError } = useGetDraft();

  if (isPostsError || isDraftsError) {
    toast.error("게시물을 불러오지 못했습니다.");
  }

  const posts: post[] = [
    ...(postsData?.data.majorActivityEvidence ?? []),
    ...(postsData?.data.humanitiesActivityEvidence ?? []),
    ...(postsData?.data.readingEvidence ?? []),
    ...(postsData?.data.otherEvidence ?? []),
  ];

  const draftPosts: Draft[] = [
    ...(draftsData?.activityEvidences ?? []),
    ...(draftsData?.readingEvidences ?? []),
  ];

  const post: post | Draft | undefined = isDraft
    ? draftPosts.find((p) => String(p.draftId) === id)
    : posts.find((p) => p.id === Number(id));

  if (!post) {
    return <div>게시물을 찾을 수 없습니다.</div>;
  }

  let type: "major" | "humanities" | "reading" | "others";

  if ("draftId" in post) {
    if ("author" in post) {
      type = "reading";
    } else if ("categoryName" in post && post.categoryName === "MAJOR") {
      type = "major";
    } else {
      type = "humanities";
    }
  } else {
    const isMajorActivity =
      isActivity(post) &&
      postsData?.data.majorActivityEvidence.some(
        (p: Activity) => p.id === post.id,
      );

    const isHumanitiesActivity =
      isActivity(post) &&
      postsData?.data.humanitiesActivityEvidence.some(
        (p: Activity) => p.id === post.id,
      );

    if (isMajorActivity ?? false) {
      type = "major";
    } else if (isHumanitiesActivity ?? false) {
      type = "humanities";
    } else if (isReading(post)) {
      type = "reading";
    } else {
      type = "others";
    }
  }

  return <EditForm post={post} type={type} />;
};

export default EditView;
