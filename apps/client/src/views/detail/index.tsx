"use client";

import { Button } from "@repo/shared/button";
import type { Draft } from "@repo/types/draft";
import type { post } from "@repo/types/evidences";
import { getCategoryName } from "@repo/utils/handleCategory";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "sonner";

import ConfirmDetail from "@/entities/detail/ui/confirmDetail";
import { useGetDraft } from "@/entities/posts/lib/useGetDraft";
import { useGetPosts } from "@/entities/posts/lib/useGetPosts";
import { useGetCurrentMember } from "@/shared/model/useGetCurrentMember";
import MockJson from "@shared/mocks/data/evidenceMock.json";

const DetailView = () => {
  const searchParams = useSearchParams();
  const example = searchParams.get("example");
  const draft = searchParams.get("draft");
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const { data: postsData, isError: isPostsError } = useGetPosts(null);
  const { data: draftsData, isError: isDraftsError } = useGetDraft();
  const { data: studentData, isError: isStudentDataError } = useGetCurrentMember();
  const [show, setShow] = useState(false);

  if (isPostsError || isDraftsError) {
    toast.error("게시물을 불러오지 못했습니다.");
  }

  if (isStudentDataError) {
    toast.error("회원 정보를 불러오지 못했습니다.");
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

  const Mock: post[] = MockJson as post[];

  let post: post | Draft | undefined;

  if (draft === "true") {
    post = draftPosts.find((post) => post.draftId === id);
  } else if (example === "true") {
    post = Mock.find((post) => post.id === Number(id));
  } else {
    post = posts.find((post) => post.id === Number(id));
  }

  const handleRevise = useCallback(() => {
    const idString = String(id);
    if (draft === "true") {
      router.push(`/edit/${idString}?draft=true`);
      return;
    }
    const exampleQuery =
      example != null && example !== "" ? "?example=true" : "";

    router.push(`/edit/${idString}${exampleQuery}`);
  }, [router, id, example, draft]);

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const handleShow = useCallback(() => {
    setShow(true);
  }, [setShow]);

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
        subTitle = post.author;
      } else if ("categoryName" in post) {
        subTitle = `카테고리: ${getCategoryName(post.categoryName)}`;
      }

      if ("imageUri" in post && (post.imageUri != null)) {
        imageUri = post.imageUri;
      }
    }
  }

  return (
    <div className="flex flex-col items-center mt-12 px-4 sm:px-8">
      <div className="flex flex-col w-full max-w-[600px] gap-7">
        <header className="flex flex-col w-full gap-2">
          <h1 className="text-[1.7rem] font-semibold sm:text-[2.25rem] ">{title}</h1>
          <h3 className="text-sm text-[#767676] text-right font-normal">
            {`${studentData?.name ?? "사용자"} · ${subTitle}`}
          </h3>
          <div className="w-full h-px bg-[#A6A6A6]" />
        </header>

        <main className="flex flex-col gap-12">
          {imageUri && (
            <div className="max-h-[21.215rem] w-full aspect-video bg-slate-600">
              <Image
                alt={title}
                className="object-cover w-full h-full"
                src={imageUri}
                width={600}
                height={337}
              />
            </div>
          )}

          <section className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold">{subTitle}</h2>
            <p className="text-lg font-normal min-h-[400px]">
              {!fileUri ? (
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

        {draft == null && (
          <span
            className="text-errors-500 underline underline-offset-4 text-body5 cursor-pointer"
            onClick={handleShow}
          >
            이 게시글 삭제하기
          </span>
        )}

        <footer className="sticky bottom-4 flex gap-[1.56rem] w-full">
          {draft == null && example == null ?
            (
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
              example == null &&
              <Button
                className="w-full"
                label="이어적기"
                variant="blue"
                onClick={handleRevise}
              />
            )}
        </footer>
      </div>
      <ConfirmDetail id={Number(id)} setShow={setShow} show={show} />
    </div>
  );
};

export default DetailView;
