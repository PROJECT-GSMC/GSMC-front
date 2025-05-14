"use client";

import { Button } from "@repo/shared/button";
import Image from "next/image";
import Header from "@shared/ui/header";
import {
  isActivity,
  isOthers,
  isReading,
} from "@repo/utils/handlePost";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { post as postType } from "@repo/types/evidences";
import { useGetPosts } from "@/entities/posts/lib/useGetPosts";

const DetailView = () => {
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
  const post = posts.filter((post) => post.id === Number(id));
  return (
    <>
      <Header />
      <div className="flex flex-col items-center mt-[3rem]">
        <div className="flex flex-col w-[37.5rem] gap-[1.75rem]">
          <header className="flex flex-col w-full gap-[0.5rem]">
            <h1 className="text-[2.25rem] font-semibold">
              {post[0] && (isActivity(post[0]) || isReading(post[0]))
                ? post[0].title
                : "Title"}
            </h1>
            <h3 className="text-[0.75rem] text-[#767676] text-right font-normal">
              {/* 게시물을 작성한 사람 이름 -> 현재 로그인 된 사람 이름 */}
              {"모태환"} {" . "}
              {post[0] && (isActivity(post[0]) || isOthers(post[0]))
                ? post[0].categoryName
                : "Area"}
            </h3>
            <div className="w-full h-[0.5px] bg-[#A6A6A6]"></div>
          </header>

          <main className="flex flex-col gap-[3rem]">
            {post[0] && isActivity(post[0]) && post[0].imageUrl && (
              <div className="h-[21.215rem] bg-slate-600">
                <Image
                  src={post[0].imageUrl}
                  alt={post[0].title ?? "img"}
                  width={188}
                  height={150}
                  className="object-cover w-full h-full"
                />
              </div>
            )}
            <section className="flex flex-col gap-[1rem]">
              <h2 className="text-[1.5rem] font-semibold">
                {post[0] && (isActivity(post[0]) || isOthers(post[0]))
                  ? `카테고리: ${post[0].categoryName}`
                  : post[0] && isReading(post[0]) && post[0].author
                    ? post[0].author
                    : "Author"}
              </h2>
              <p className="text-[1.25rem] font-normal min-h-[29s.9375rem]">
                {post[0] && (isActivity(post[0]) || isReading(post[0]))
                  ? post[0].content
                  : ""}
              </p>
            </section>
          </main>

          <footer className="sticky bottom-4 flex gap-[1.56rem] w-full">
            <Button label="수정하기" variant="blue" className="w-full" />
            <Button
              label="뒤로가기"
              variant="skyblue"
              className="w-full bg-white"
            />
          </footer>
        </div>
      </div>
    </>
  );
};

export default DetailView;
