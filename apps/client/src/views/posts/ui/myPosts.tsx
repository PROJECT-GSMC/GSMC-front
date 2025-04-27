"use client";

import { useState } from "react";

import { Button } from "@repo/ui/button";

import Header from "@shared/ui/header";
import Post from "@shared/ui/post/post";
import Search from "@entities/posts/ui/search";

const PostsWidget = () => {
  const [result, setResult] = useState<string>("");
  return (
    <div className="flex flex-col items-center">
      <Header />
      <div className="w-full max-w-[37.5rem]">
        <Search result={result} setResult={setResult} />
        <div className="flex gap-[1rem] justify-between">
          <Button label="독서" variant="skyblue" />
          <Button label="인성" variant="skyblue" />
          <Button label="전공" variant="skyblue" />
          <Button label="외국어" variant="skyblue" />
          <Button label="임시저장" variant="skyblue" />
        </div>
        <div className="flex mt-[2.69rem] overflow-y-visible flex-wrap w-full justify-center gap-[1.12rem]">
          <Post
            data={{
              id: 1,
              title: "예시 게시물 제목",
              content: "이것은 게시물의 내용입니다.",
              imageUrl: "https://via.placeholder.com/150",
              status: "APPROVE",
              categoryName: "동아리",
            }}
          />
          <Post
            data={{
              id: 1,
              title: "예시 게시물 제목",
              content: "이것은 게시물의 내용입니다.",
              imageUrl: "https://via.placeholder.com/150",
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
