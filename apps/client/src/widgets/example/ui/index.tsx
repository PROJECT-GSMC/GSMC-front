"use client";

import { usePost } from "@repo/store/postProvider";
import type { PostType } from "@repo/types/evidences";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

import { Post } from "@/shared/ui";
import Mock from "@shared/mocks/data/evidenceMock.json";

export default function ExampleWidget() {
  const { setPost } = usePost();
  const router = useRouter();

  const handleRoute = useCallback((mock: PostType) => () => {
    setPost(mock);
    router.push(`/detail/${mock.id}?example=${true}`);
  }, [router, setPost]);

  const mockPosts: PostType[] = [
    ...(Mock.majorActivityEvidence),
    ...(Mock.humanitiesActivityEvidence),
    ...(Mock.readingEvidence),
    ...(Mock.otherEvidence),
  ] as PostType[];

  return (
    <div className="flex mt-[2.69rem] overflow-y-visible flex-wrap sm:justify-start justify-center w-full gap-[1.12rem]">
      {mockPosts.map((mock) => {
        return (
          <Post
            isExample
            data={mock}
            key={mock.id}
            onClick={handleRoute(mock)}
          />
        );
      })}
    </div>
  );
}
