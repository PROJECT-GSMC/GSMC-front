"use client";

import { Button } from "@repo/shared/button";
import type { post } from "@repo/types/evidences";
import { getCategoryName } from "@repo/utils/handleCategory";
import { isActivity, isOthers, isReading } from "@repo/utils/handlePost";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "sonner";

import { useGetPosts } from "@/entities/posts/lib/useGetPosts";
import { useGetCurrentMember } from "@/shared/model/useGetCurrentMember";
import MockJson from "@shared/mocks/data/evidenceMock.json";
import ConfirmDetail from "@/entities/detail/ui/confirmDetail";

const DetailView = () => {
  const searchParams = useSearchParams();
  const example = searchParams.get("example");
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const { data, isError } = useGetPosts(null);
  const { data: data2, isError: isError2 } = useGetCurrentMember();
  const [show, setShow] = useState(false);

  if (isError) {
    toast.error("게시물을 불러오지 못했습니다.");
  }

  if (isError2) {
    toast.error("회원 정보를 불러오지 못했습니다.");
  }

  const posts: post[] = [
    ...(data?.data.majorActivityEvidence ?? []),
    ...(data?.data.humanitiesActivityEvidence ?? []),
    ...(data?.data.readingEvidence ?? []),
    ...(data?.data.otherEvidence ?? []),
  ];

  const Mock: post[] = MockJson as post[];

  const post =
    example == null
      ? posts.find((post) => post.id === Number(id))
      : Mock.find((post) => post.id === Number(id));

  const handleRevise = useCallback(() => {
    const idString = String(id);
    const exampleQuery =
      example != null && example !== "" ? "?example=true" : "";
    router.push(`/edit/${idString}${exampleQuery}`);
  }, [router, id, example]);

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <div className="flex flex-col items-center mt-[3rem]">
      <div className="flex flex-col w-[37.5rem] gap-[1.75rem]">
        <header className="flex flex-col w-full gap-[0.5rem]">
          <h1 className="text-[2.25rem] font-semibold">
            {post && (isActivity(post) || isReading(post))
              ? post.title
              : "Title"}
          </h1>
          <h3 className="text-[0.75rem] text-[#767676] text-right font-normal">
            {`${data2?.name ?? "사용자"} . ${
              post && (isActivity(post) || isOthers(post))
                ? getCategoryName(post.categoryName)
                : "Area"
            }`}
          </h3>
          <div className="w-full h-[0.5px] bg-[#A6A6A6]" />
        </header>

        <main className="flex flex-col gap-[3rem]">
          {post &&
          isActivity(post) &&
          post.imageUrl != null &&
          post.imageUrl !== "" ? (
            <div className="h-[21.215rem] bg-slate-600">
              <Image
                alt={post.title}
                className="object-cover w-full h-full"
                height={150}
                src={post.imageUrl ?? ""}
                width={188}
              />
            </div>
          ) : null}
          <section className="flex flex-col gap-[1rem]">
            <h2 className="text-[1.5rem] font-semibold">
              {post && (isActivity(post) || isOthers(post))
                ? `카테고리: ${getCategoryName(post.categoryName)}`
                : post && isReading(post) && post.author
                  ? post.author
                  : "Author"}
            </h2>
            <p className="text-[1.25rem] font-normal min-h-[29s.9375rem]">
              {post && (isActivity(post) || isReading(post))
                ? post.content
                : ""}
            </p>
          </section>
        </main>
        <span
          onClick={() => {
            setShow(true);
          }}
          className="text-errors-500 underline underline-offset-4 text-body5 cursor-pointer"
        >
          이 게시글 삭제하기
        </span>
        <footer className="sticky bottom-4 flex gap-[1.56rem] w-full">
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
        </footer>
      </div>
      <ConfirmDetail id={Number(id)} setShow={setShow} show={show} />
    </div>
  );
};

export default DetailView;
