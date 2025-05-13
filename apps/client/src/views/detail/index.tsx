"use client";

import { Button } from "@repo/ui/button";
import Image from "next/image";
import Header from "@shared/ui/header";
import {
  isActivity,
  isOthers,
  isReading,
} from "node_modules/@repo/ui/src/utils/handlePost";
import { usePost } from "@repo/ui/store/postProvider";

const DetailView = () => {
  const { post } = usePost();
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
              {/* 게시물을 작성한 사람 이름 -> 현재 로그인 된 사람 이름 */}
              {"모태환"} {" . "}
              {post && (isActivity(post) || isOthers(post))
                ? post.categoryName
                : "Area"}
            </h3>
            <div className="w-full h-[0.5px] bg-[#A6A6A6]"></div>
          </header>

          <main className="flex flex-col gap-[3rem]">
            {post && isActivity(post) && post.imageUrl && (
              <div className="h-[21.215rem] bg-slate-600">
                <Image
                  src={post.imageUrl}
                  alt={post.title ?? "img"}
                  fill
                  className="w-full"
                />
              </div>
            )}
            <section className="flex flex-col gap-[1rem]">
              <h2 className="text-[1.5rem] font-semibold">
                {post && (isActivity(post) || isOthers(post))
                  ? `카테고리: ${post.categoryName}`
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
