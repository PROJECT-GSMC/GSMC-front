"use client";

import { useState } from "react";

import { Button } from "@repo/shared/button";

import Header from "@shared/ui/header";
import Post from "@/shared/ui/post/post";
import Search from "@entities/posts/ui/search";
import { useGetDraft } from "@/entities/posts/lib/useGetDraft";
import { EvidenceType, post } from "@repo/types/evidences";
import { useGetPosts } from "@/entities/posts/lib/useGetPosts";
import { toast } from "sonner";
import { usePost } from "@repo/store/postProvider";
import { useRouter } from "next/navigation";

const PostsView = () => {
  const [result, setResult] = useState<post[] | undefined>();
  const [search, setSearch] = useState<string>("");
  const [categoryName, setCategoryName] = useState<EvidenceType | "DRAFT">(
    "MAJOR"
  );
  const { setPost } = usePost();
  const { data, isError } = useGetPosts(categoryName);
  const { data: draftData, isError: Error2 } = useGetDraft();
  const R = useRouter();

  if (isError || Error2) {
    toast.error("게시물을 불러오지 못했습니다.");
  }

  const posts: post[] = [
    ...(data?.data?.majorActivityEvidence ?? []),
    ...(data?.data?.humanitiesActivityEvidence ?? []),
    ...(data?.data?.readingEvidence ?? []),
    ...(data?.data?.otherEvidence ?? []),
  ];

  const draftPosts: post[] = [
    ...(draftData?.activityEvidences || []),
    ...(draftData?.readingEvidences || []),
  ];

  return (
    <div className="flex flex-col items-center">
      <Header />
      <div className="w-full max-w-[37.5rem]">
        <Search
          setSearch={setSearch}
          type={categoryName}
          search={search}
          setResult={setResult}
        />
        <div className="flex gap-[1rem] justify-between">
          <Button
            label="전공"
            onClick={() => setCategoryName("MAJOR")}
            variant={categoryName === "MAJOR" ? "blue" : "skyblue"}
          />
          <Button
            label="인성"
            onClick={() => setCategoryName("HUMANITIES")}
            variant={categoryName === "HUMANITIES" ? "blue" : "skyblue"}
          />
          <Button
            onClick={() => setCategoryName("READING")}
            label="독서"
            variant={categoryName === "READING" ? "blue" : "skyblue"}
          />
          <Button
            label="외국어"
            onClick={() => setCategoryName("FOREIGN_LANGUAGE")}
            variant={categoryName === "FOREIGN_LANGUAGE" ? "blue" : "skyblue"}
          />
          <Button
            onClick={() => setCategoryName("DRAFT")}
            label="임시저장"
            variant={categoryName === "DRAFT" ? "blue" : "skyblue"}
          />
        </div>
        <div className="flex mt-[2.69rem] overflow-y-visible flex-wrap w-full justify-center gap-[1.12rem]">
          <div className="flex mt-[2.69rem] overflow-y-visible flex-wrap w-full justify-center gap-[1.12rem]">
            {result && result.length > 0
              ? result.map((post) => (
                  <Post
                    onClick={() => {
                      setPost(post);
                      R.push(`/detail/${post.id}`);
                    }}
                    data={post}
                    key={post.id}
                  />
                ))
              : categoryName !== "DRAFT"
                ? posts.map((post) => (
                    <Post
                      onClick={() => {
                        setPost(post);
                        R.push(`/detail/${post.id}`);
                      }}
                      data={post}
                      key={post.id}
                    />
                  ))
                : draftPosts.map((post) => (
                    <Post
                      onClick={() => {
                        setPost(post);
                        R.push(`/detail/${post.id}`);
                      }}
                      data={post}
                      key={post.id}
                    />
                  ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostsView;
