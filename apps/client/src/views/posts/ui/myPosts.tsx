"use client";

import { useState } from "react";

import { Button } from "@repo/ui/button";

import Header from "@shared/ui/header";
import Post from "@/shared/ui/post/post";
import Search from "@entities/posts/ui/search";
import { useGetDraft } from "@/entities/posts/lib/useGetDraft";
import { usePost } from "@/shared/store/postProvider";
import { EvidenceType, post } from "node_modules/@repo/ui/src/types/evidences";
import { useGetPosts } from "@/entities/posts/lib/useGetPosts";
import { toast } from "sonner";

const PostsView = () => {
  const [result, setResult] = useState<string>("");
  const [categoryName, setCategoryName] = useState<EvidenceType>("MAJOR");
  const { setPost } = usePost();
  const { data, isError } = useGetPosts(categoryName);

  if (isError) {
    toast.error("게시물을 불러오지 못했습니다.");
  }
  return (
    <div className="flex flex-col items-center">
      <Header />
      <div className="w-full max-w-[37.5rem]">
        <Search result={result} setResult={setResult} />
        <div className="flex gap-[1rem] justify-between">
          <Button
            onClick={() => setCategoryName("READING")}
            label="독서"
            variant="skyblue"
          />
          <Button
            label="인성"
            onClick={() => setCategoryName("HUMANITIES")}
            variant="skyblue"
          />
          <Button
            label="전공"
            onClick={() => setCategoryName("MAJOR")}
            variant="skyblue"
          />
          <Button
            label="외국어"
            onClick={() => setCategoryName("FOREIGN_LANGUAGE")}
            variant="skyblue"
          />
          <Button onClick={useGetDraft} label="임시저장" variant="skyblue" />
        </div>
        <div className="flex mt-[2.69rem] overflow-y-visible flex-wrap w-full justify-center gap-[1.12rem]">
          {data?.data.map((post: post) => {
            return (
              <Post onClick={() => setPost(post)} data={post} key={post.id} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PostsView;
