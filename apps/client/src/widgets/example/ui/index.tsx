"use client";

import { usePost } from "@repo/store/postProvider";
import type { post } from "@repo/types/evidences";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

import { Post } from "@/shared/ui";
import Mock from "@shared/mocks/data/evidenceMock.json";

export default function ExampleWidget() {
  const { setPost } = usePost();
  const R = useRouter();

  const handleExamplePost = useCallback((data: post) => () => {
    setPost(data);
    R.push(`/detail/${data.id}?example=${true}`);
  }, [R, setPost]);

  const mockPosts: post[] = [
    ...(Mock.majorActivityEvidence as post[]),
    ...(Mock.humanitiesActivityEvidence as post[]),
    ...(Mock.readingEvidence as post[]),
    ...(Mock.otherEvidence as post[]),
  ];


  return (
    <div className="flex mt-[2.69rem] overflow-y-visible flex-wrap sm:justify-start justify-center w-full gap-[1.12rem]">
      {mockPosts.map((data) => {
        return (
          <Post
            isExample
            data={data}
            key={data.id}
            onClick={handleExamplePost(data)}
          />
        );
      })}
    </div>
  );
}
