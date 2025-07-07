"use client";

import { Button } from "@repo/shared/button";
import ConfirmModal from "@repo/shared/confirmModal";
import { usePost } from "@repo/store/postProvider";
import { getCategoryName } from "@repo/utils/handleCategory";
import { isActivity, isDraft, isOthers, isReading } from "@repo/utils/handlePost";
import { useMutation } from "@tanstack/react-query";
import { HttpStatusCode } from "axios";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "sonner";

import { deletePost } from "@/entities/detail/api/deletePost";
import type { HttpError } from "@/shared/model/error";

const DetailView = () => {
  const params = useParams();
  const searchParams = useSearchParams()
  const router = useRouter();

  const example = searchParams.get("example");
  const type = searchParams.get("type")
  const { id } = params;

  const [modalOpen, setModalOpen] = useState(false);
  const { post } = usePost();

  const { mutate: deletePostMutation } = useMutation({
    mutationFn: deletePost,
    onSuccess: (data) => {
      if (data.status === 204) {
        toast.success("게시글이 삭제되었습니다");
        router.push("/posts");
      }
    },
    onError: (error: HttpError) => {
      if (error.httpStatus == HttpStatusCode.NotFound) {
        toast.error("해당하는 게시글이 존재하지 않습니다.")
      } else {
        toast.error("게시글 삭제를 실패하였습니다.")
      }
    }
  })

  const handleRevise = useCallback(() => {
    router.push(`/edit/${String(id)}?type=${type}`);
  }, [id, router, type]);


  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const handleModalOpen = useCallback(() => {
    setModalOpen(true);
  }, []);


  const handleDelete = useCallback(() => {
    deletePostMutation(Number(id))
  }, [deletePostMutation, id]);

  if (!post) return <p>존재하지 않는 게시물입니다.</p>;

  const title = (() => {
    if (isActivity(post) || isReading(post)) return post.title;
    if (isOthers(post)) return post.evidenceType
    return null;
  })();

  const imageUri = isActivity(post) ? post.imageUri : null;

  const subTitle = (() => {
    if (isReading(post)) return `${post.author}`;
    if (isOthers(post)) return getCategoryName(post.categoryName);
    if (isActivity(post)) return getCategoryName(post.categoryName);
    return null;
  })();

  return (
    <div className="flex flex-col items-center mt-12 px-4 sm:px-8">
      <div className="flex flex-col w-full max-w-[600px] gap-7">
        <header className="flex flex-col w-full gap-2">
          <h1 className="text-[1.7rem] font-semibold sm:text-[2.25rem]">
            {title}
          </h1>
          <div className="w-full h-px bg-[#A6A6A6]" />
        </header>
        <main className="flex flex-col gap-12">
          {imageUri == null ? null : (
            <div className="max-h-[21.215rem] w-full aspect-video bg-slate-600">
              <Image
                alt="gsmc"
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
              {isOthers(post) ? (
                <a
                  className="underline"
                  href={post.fileUri}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  증빙 파일 보기
                </a>
              ) : (
                post.content
              )}
            </p>
          </section>
        </main>
        {!isDraft(post) && example == null && (
          <span
            className="text-errors-500 underline underline-offset-4 text-body5 cursor-pointer"
            onClick={handleModalOpen}
          >
            이 게시글 삭제하기
          </span>
        )}
        <footer className="sticky bottom-4 flex gap-[1.56rem] w-full">
          {(example == null) ? (
            isDraft(post) ? (
              <Button
                className="w-full"
                label="이어적기"
                variant="blue"
                onClick={handleRevise}
              />
            ) : (
              <Button
                className="w-full"
                label="수정하기"
                variant="blue"
                onClick={handleRevise}
              />
            )
          ) : null}
          <Button
            className="w-full bg-white"
            label="뒤로가기"
            variant="skyblue"
            onClick={handleBack}
          />
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
