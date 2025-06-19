"use client";

import { Button } from "@repo/shared/button";
import type { PostType } from "@repo/types/postType";
import { isActivity, isOthers, isReading } from "@repo/utils/handlePost";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useCallback } from "react";
import { toast } from "sonner";

import { useGetPosts } from "@/views/check-post/model/useGetPosts";
import Header from "@shared/ui/header";

export default function DetailView() {
  const { id } = useParams();
  const R = useRouter();

  const { data, isError } = useGetPosts(String(id), null);

  if (isError) {
    toast.error("게시물을 불러오지 못했습니다.");
  }

  const posts: PostType[] | [] = [
    ...(data?.data.majorActivityEvidence ?? []),
    ...(data?.data.humanitiesActivityEvidence ?? []),
    ...(data?.data.readingEvidence ?? []),
    ...(data?.data.otherEvidence ?? []),
  ] as PostType[];

  const post = posts.find((item) => item.id === Number(id));

  const Back = useCallback(() => {
    R.back();
  }, [R]);

  return (
    <>
      <Header />
      <div className="flex flex-col items-center mt-[3rem]">
        <div className="flex flex-col w-[37.5rem] gap-[1.75rem]">
          <header className="flex flex-col w-full gap-[0.5rem]">
            <h1 className="text-[2.25rem] font-semibold">
              {post && (isActivity(post) || isReading(post))
                ? post.title
                : "Title"}
            </h1>
            <h3 className="text-[0.75rem] text-[#767676] text-right font-normal">
              {post && isReading(post) ? post.author : "사용자"} {" . "}
              {post && (isActivity(post) || isOthers(post))
                ? post.categoryName
                : "Area"}
            </h3>
          </header>

          <main className="flex flex-col gap-[3rem]">
            {post && isActivity(post) && post.imageUri ? (
              <div className="h-[21.215rem] bg-slate-600">
                <Image
                  alt={post.title}
                  className="object-cover w-full h-full"
                  height={150}
                  src={post.imageUri}
                  width={188}
                />
              </div>
            ) : null}
            <section className="flex flex-col gap-[1rem]">
              <h2 className="text-[1.5rem] font-semibold">
                {(() => {
                  if (!post) return "Author";
                  if (isActivity(post) || isOthers(post)) {
                    return `카테고리: ${post.categoryName}`;
                  }
                  if (isReading(post)) {
                    return (post as { author?: string }).author ?? "Author";
                  }
                  return "Author";
                })()}
              </h2>

              <p className="text-[1.25rem] font-normal min-h-[29.9375rem]">
                {post?.content ?? ""}
              </p>
            </section>
          </main>

          <footer className="sticky bottom-4 flex gap-[1.56rem] w-full">
            <Button className="w-full" label="수정하기" variant="blue" />
            <Button
              className="w-full bg-white"
              label="뒤로가기"
              variant="skyblue"
              onClick={Back}
            />
          </footer>
        </div>
      </div>
    </>
  );
}
