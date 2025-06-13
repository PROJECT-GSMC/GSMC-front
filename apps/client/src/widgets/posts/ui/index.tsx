"use client";

import { Button } from "@repo/shared/button";
import { usePost } from "@repo/store/postProvider";
import type { EvidenceType, post } from "@repo/types/evidences";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { useGetDraft } from "@/entities/posts/lib/useGetDraft";
import { useGetPosts } from "@/entities/posts/lib/useGetPosts";
import Search from "@/entities/posts/ui/search";
import { Post } from "@/shared/ui";

export default function PostsWidget() {
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

  const Buttons = [
    { label: "전공", value: "MAJOR" },
    { label: "인성", value: "HUMANITIES" },
    { label: "독서", value: "READING" },
    { label: "외국어", value: "FOREIGN_LANGUAGE" },
    { label: "임시저장", value: "DRAFT" },
  ];
  return (
    <div className="w-full max-w-[37.5rem]">
      <Search
        search={search}
        setResult={setResult}
        setSearch={setSearch}
        type={categoryName}
      />
      <div className="flex gap-[1rem] justify-between">
        {Buttons.map((button) => {
          return (
            <Button
              key={button.value}
              label={button.label}
              variant={categoryName === button.value ? "blue" : "skyblue"}
              onClick={() => { setCategoryName(button.value as EvidenceType | "DRAFT"); }
              }
            />
          );
        })}
      </div>
      <div className="flex mt-[2.69rem] overflow-y-visible flex-wrap w-full justify-center gap-[1.12rem]">
        <div className="flex mt-[2.69rem] overflow-y-visible flex-wrap sm:justify-start justify-center w-full gap-[1.12rem]">
          {result && result.length > 0
            ? result.map((post) => (
              <Post
                data={post}
                key={post.id}
                onClick={() => {
                  setPost(post);
                  R.push(`/detail/${post.id}`);
                }}
              />
            ))
            : (categoryName === "DRAFT"
              ? draftPosts.map((post) => (
                <Post
                  data={post}
                  key={post.id}
                  onClick={() => {
                    setPost(post);
                    R.push(`/detail/${post.id}`);
                  }}
                />
              ))
              : posts.map((post) => (
                <Post
                  data={post}
                  key={post.id}
                  onClick={() => {
                    setPost(post);
                    R.push(`/detail/${post.id}`);
                  }}
                />
              )))}
        </div>
      </div>
    </div>
  );
}
