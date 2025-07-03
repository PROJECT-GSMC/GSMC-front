"use client";

import { Button } from "@repo/shared/button";
import ConfirmModal from "@repo/shared/confirmModal";
import type { Draft } from "@repo/types/draft";
import type { post } from "@repo/types/evidences";
import { getCategoryName } from "@repo/utils/handleCategory";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "sonner";

import { deletePost } from "@/entities/detail/api/deletePost";
import { useGetDraft } from "@/shared/lib/useGetDraft";
import { useGetPosts } from "@/shared/lib/useGetPosts";
import Mock from "@shared/mocks/data/evidenceMock.json";

const DetailView = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const searchParams = useSearchParams();
  const example = searchParams.get("example");
  const draft = searchParams.get("draft");

  const params = useParams();
  const router = useRouter();
  const { id } = params;

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

  const mockPosts: post[] = [
    ...(Mock.majorActivityEvidence as post[]),
    ...(Mock.humanitiesActivityEvidence as post[]),
    ...(Mock.readingEvidence as post[]),
    ...(Mock.otherEvidence as post[]),
  ];

  let post: post | Draft | undefined;

  if (draft === "true") {
    post = draftPosts.find((post) => post.draftId === id);
  } else if (example === "true") {
    post = mockPosts.find((post) => post.id === Number(id));
  } else {
    post = posts.find((post) => post.id === Number(id));
  }

  const handleRevise = useCallback(() => {
    if (draft === "true") {
      router.push(`/edit/${String(id)}?draft=${true}`);
      return;
    } else if (example == "true") {
      router.push(`/edit/${String(id)}?example=${true}`);
    } else {
      router.push(`edit/${String(id)}`)
    }
  }, [router, id, example, draft]);

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const handleModalOpen = useCallback(() => {
    setModalOpen(true);
  }, []);

  const handleDelete = useCallback(() => {
    void (async () => {
      const res = await deletePost((Number(id)));
      if (res.status === 204) {
        toast.success("게시글이 삭제되었습니다");
        router.push("/posts");
      } else {
        toast.error("게시글 삭제 실패하였습니다");
      }
    })();
  }, [id, router]);

  let title = "Title";
  let subTitle = "Author";
  let content = "";
  let imageUri: string | null | undefined;
  let fileUri: string | null | undefined;

  if (post) {
    if ("evidenceType" in post) {
      title = post.evidenceType;
      subTitle = `카테고리: ${getCategoryName(post.categoryName)}`;
      content = "자세한 내용은 파일을 확인해주세요.";
      fileUri = post.fileUri;
    } else {
      title = post.title;
      content = post.content;

      if ("author" in post && post.author) {
        subTitle = `저자: ${post.author}`;
      } else if ("categoryName" in post) {
        subTitle = `카테고리: ${getCategoryName(post.categoryName)}`;
      }

      if ("imageUri" in post && post.imageUri != null) {
        imageUri = post.imageUri;
      }
    }
  }

  return (
    <div className="flex flex-col items-center mt-12 px-4 sm:px-8">
      <div className="flex flex-col w-full max-w-[600px] gap-7">
        <header className="flex flex-col w-full gap-2">
          <h1 className="text-[1.7rem] font-semibold sm:text-[2.25rem] ">
            {title}
          </h1>
          <div className="w-full h-px bg-[#A6A6A6]" />
        </header>
        <main className="flex flex-col gap-12">
          {imageUri == null ? null : (
            <div className="max-h-[21.215rem] w-full aspect-video bg-slate-600">
              <Image
                alt={title}
                className="object-cover w-full h-full"
                height={337}
                src={imageUri}
                width={600}
              />
            </div>
          )}
          <section className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold">{subTitle}</h2>
            <p className="text-lg font-normal min-h-[400px] break-words">
              {fileUri == null ? (
                content
              ) : (
                <a
                  className="underline"
                  href={fileUri}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  증빙 파일 보기
                </a>
              )}
            </p>
          </section>
        </main>
        {draft == null && example !== "true" && (
          <span
            className="text-errors-500 underline underline-offset-4 text-body5 cursor-pointer"
            onClick={handleModalOpen}
          >
            이 게시글 삭제하기
          </span>
        )}
        <footer className="sticky bottom-4 flex gap-[1.56rem] w-full">
          {draft == null && example == null ? (
            <>
              <Button
                className="w-full"
                label="수정하기"
                variant="blue"
                onClick={handleRevise}
              />
              <Button
                className="w-full bg-white"
                label="뒤로가기"
                variant="skyblue"
                onClick={handleBack}
              />
            </>
          ) : (
            example == null && (
              <Button
                className="w-full"
                label="이어적기"
                variant="blue"
                onClick={handleRevise}
              />
            )
          )}
        </footer>
      </div>
      {modalOpen ? (
        <ConfirmModal
          cancel={{
            label: "취소",
            onClick: () => {
              setModalOpen(false);
            },
          }}
          confirm={{
            label: "삭제",
            onClick: () => {
              setModalOpen(false);
              handleDelete();
            },
          }}
          description="정말 이 게시물을 삭제 하시겠습니까?"
          title="게시물 삭제"
        />
      ) : null}
    </div>
  );
};

export default DetailView;
