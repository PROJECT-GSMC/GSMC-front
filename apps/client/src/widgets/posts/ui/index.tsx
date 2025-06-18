"use client";

import { Button } from "@repo/shared/button";
import { usePost } from "@repo/store/postProvider";
import type { EvidenceResponse, post } from "@repo/types/evidences";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "sonner";

import { useGetDraft } from "@/entities/posts/lib/useGetDraft";
import { useGetPosts } from "@/entities/posts/lib/useGetPosts";
import Search from "@/entities/posts/ui/search";
import { Post } from "@/shared/ui";

import type { CategoryType } from "../model/category";

export default function PostsWidget() {
  const R = useRouter();
  const [result, setresult] = useState<EvidenceResponse>();
  const [search, setSearch] = useState<string>("");
  const [categoryName, setCategoryName] = useState<CategoryType>("MAJOR");

  const { data: postsData, isError: isPostsError } = useGetPosts(categoryName);
  const { data: draftsData, isError: isDraftsError } = useGetDraft();
  const { setPost } = usePost();

  if (isPostsError || isDraftsError) {
    toast.error("게시물을 불러오지 못했습니다.");
  }

  const posts: post[] = [
    ...(postsData?.data.majorActivityEvidence ?? []),
    ...(postsData?.data.humanitiesActivityEvidence ?? []),
    ...(postsData?.data.readingEvidence ?? []),
    ...(postsData?.data.otherEvidence ?? []),
  ];

  const draftPosts: post[] = [
    ...(draftsData?.activityEvidences ?? []),
    ...(draftsData?.readingEvidences ?? []),
  ];

  const resultPosts: post[] = [
    ...(result?.majorActivityEvidence ?? []),
    ...(result?.humanitiesActivityEvidence ?? []),
    ...(result?.readingEvidence ?? []),
    ...(result?.otherEvidence ?? []),
  ]

  const Buttons: { value: CategoryType, label: string }[] = [
    { label: "독서", value: "READING" },
    { label: "인성", value: "HUMANITIES" },
    { label: "전공", value: "MAJOR" },
    { label: "외국어", value: "FOREIGN_LANGUAGE" },
    { label: "임시저장", value: "DRAFT" },
  ];

  const handleCategory = useCallback((value: CategoryType) => () => {
    setCategoryName(value)
  }, [])

  const handleRoute = useCallback((post: post) => () => {
    setPost(post);
    R.push(`/detail/${post.id}`);
  }, [R, setPost])

  return (
    <div className="w-full max-w-[37.5rem]">
      <Search
        search={search}
        setResult={setresult}
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
              onClick={handleCategory(button.value)}
            />
          );
        })}
      </div>
      <div className="flex mt-[2.69rem] overflow-y-visible flex-wrap w-full justify-center gap-[1.12rem]">
        <div className="flex mt-[2.69rem] overflow-y-visible flex-wrap sm:justify-start justify-center w-full gap-[1.12rem]">
          {search.trim().length > 0 && resultPosts.length > 0 ? resultPosts.map((post) => (
            <Post
              data={post}
              key={post.id}
              onClick={handleRoute(post)}
            />
          )) : (categoryName === "DRAFT" ? draftPosts.map((post) => (
            <Post
              data={post}
              key={post.id}
              onClick={handleRoute(post)}
            />
          )) : posts.map((post) => (
            <Post
              data={post}
              key={post.id}
              onClick={handleRoute(post)}
            />
          )))}
        </div>
      </div>
    </div>
  );
}
