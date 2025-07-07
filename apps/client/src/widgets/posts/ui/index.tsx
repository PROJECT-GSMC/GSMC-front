"use client";

import { Button } from "@repo/shared/button";
import { usePost } from "@repo/store/postProvider";
import type { DraftType } from "@repo/types/draft";
import type { PostType, PostResponse } from "@repo/types/evidences";
import { isDraft } from "@repo/utils/handlePost";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "sonner";

import Search from "@/entities/posts/ui/search";
import { useGetDraft } from "@/shared/lib/useGetDraft";
import { useGetPosts } from "@/shared/lib/useGetPosts"
import { Post } from "@/shared/ui";

import type { CategoryType } from "../model/category";

export default function PostsWidget() {
  const router = useRouter();
  const [result, setResult] = useState<PostResponse>();
  const [search, setSearch] = useState<string>("");
  const [categoryName, setCategoryName] = useState<CategoryType>("READING");

  const { posts, isError: isPostsError } = useGetPosts(categoryName);
  const { drafts, isError: isDraftsError } = useGetDraft(categoryName);
  const { setPost } = usePost();

  if (isPostsError || isDraftsError) {
    toast.error("게시물을 불러오지 못했습니다.");
  }

  const resultPosts: PostType[] = [
    ...(result?.majorActivityEvidence ?? []),
    ...(result?.humanitiesActivityEvidence ?? []),
    ...(result?.readingEvidence ?? []),
    ...(result?.otherEvidence ?? []),
  ];

  const Buttons: { value: CategoryType; label: string }[] = [
    { label: "독서", value: "READING" },
    { label: "인성", value: "HUMANITIES" },
    { label: "전공", value: "MAJOR" },
    { label: "외국어", value: "FOREIGN_LANGUAGE" },
    { label: "임시저장", value: "DRAFT" },
  ];

  let displayedPosts: (PostType | DraftType)[] = [];

  if (search.trim().length > 0 && resultPosts.length > 0) {
    displayedPosts = resultPosts;
  } else if (categoryName === "DRAFT") {
    displayedPosts = drafts;
  } else {
    displayedPosts = posts;
  }

  const handleCategory = useCallback((value: CategoryType) => () => {
    setCategoryName(value);
  }, []);

  const handleRoute = useCallback((post: PostType | DraftType) => () => {
    setPost(post);
    if (isDraft(post)) {
      router.push(`/detail/${post.draftId}?type=${categoryName}`);
    } else {
      router.push(`/detail/${post.id}?type=${categoryName}`);
    }
  }, [categoryName, router, setPost]);

  return (
    <div className="w-full max-w-[37.5rem]">
      <Search
        search={search}
        setResult={setResult}
        setSearch={setSearch}
        type={categoryName}
      />
      <div className="flex gap-[1rem] justify-between">
        {Buttons.map((button) => (
          <Button
            key={button.value}
            label={button.label}
            variant={categoryName === button.value ? "blue" : "skyblue"}
            onClick={handleCategory(button.value)}
          />
        ))}
      </div>
      <div className="flex mt-[2.69rem] overflow-y-visible flex-wrap w-full justify-center gap-[1.12rem]">
        <div className="flex mt-[2.69rem] overflow-y-visible flex-wrap sm:justify-start justify-center w-full gap-[1.12rem]">
          {displayedPosts.map((post) => (
            <Post
              data={post}
              key={isDraft(post) ? post.draftId : post.id}
              onClick={handleRoute(post)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
