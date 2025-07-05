"use client";

import { usePost } from "@repo/store/postProvider";
import type { post } from "@repo/types/evidences";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

import { Post } from "@/shared/ui";
import Mock from "@shared/mocks/data/evidenceMock.json";

export default function ExampleWidget() {
  const { setPost } = usePost();
  const router = useRouter();

  const handleRoute = useCallback((mock: post) => () => {
    setPost(mock);
    router.push(`/detail/${mock.id}`);
  }, [router, setPost]);

  const mockPosts: post[] = [
    ...(Mock.majorActivityEvidence as post[]),
    ...(Mock.humanitiesActivityEvidence as post[]),
    ...(Mock.readingEvidence as post[]),
    ...(Mock.otherEvidence as post[]),
  ];

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
