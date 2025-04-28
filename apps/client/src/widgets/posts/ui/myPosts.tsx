"use client";

import { useState } from "react";

import { Button } from "@repo/ui/button";

import Search from "@entities/posts/ui/search";
import { Header, Post } from "@shared/ui";

const PostsWidget = () => {
  const [result, setResult] = useState<string>("");
  return (
    <div className="flex flex-col items-center">
      <Header />
      <div className="w-full max-w-[37.5rem] px-[1rem] sm:px-[0rem] min-w-[17.9rem] overflow-auto">
        <Search result={result} setResult={setResult} />
        <div className="grid justify-items-center sm:grid-cols-5 grid-cols-3 gap-[1rem]">
          <Button label="독서" variant="skyblue" className="min-w-[4.3rem]" />
          <Button label="인성" variant="skyblue" className="min-w-[4.3rem]" />
          <Button label="전공" variant="skyblue" className="min-w-[4.3rem]" />
          <Button label="외국어" variant="skyblue" className="min-w-[4.3rem]" />
          <Button label="임시저장" variant="skyblue" className="min-w-[4.3rem]" />
        </div>
        <div className="flex mt-[2.69rem] overflow-y-visible flex-wrap w-full justify-center gap-[1.12rem]">
          <Post
            data={{
              id: 1,
              title: "예시 게시물 제목",
              content: "이것은 게시물의 내용입니다.",
              imageUrl: "",
              status: "APPROVE",
              categoryName: "동아리",
            }}
          />
          <Post
            data={{
              id: 1,
              title: "예시 게시물 제목",
              content: "이것은 게시물의 내용입니다.",
              imageUrl: "",
              status: "APPROVE",
              categoryName: "동아리",
            }}
          />
          <Post
            data={{
              id: 1,
              title: "예시 게시물 제목",
              content: "이것은 게시물의 내용입니다.",
              imageUrl: "",
              status: "APPROVE",
              categoryName: "동아리",
            }}
          />
          <Post
            data={{
              id: 1,
              title: "예시 게시물 제목",
              content: "이것은 게시물의 내용입니다.",
              imageUrl: "",
              status: "APPROVE",
              categoryName: "동아리",
            }}
          />
          <Post
            data={{
              id: 1,
              title: "예시 게시물 제목",
              content: "이것은 게시물의 내용입니다.",
              imageUrl: "",
              status: "APPROVE",
              categoryName: "동아리",
            }}
          />
          <Post
            data={{
              id: 1,
              title: "예시 게시물 제목",
              content: "이것은 게시물의 내용입니다.",
              imageUrl: "",
              status: "APPROVE",
              categoryName: "동아리",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PostsWidget;
