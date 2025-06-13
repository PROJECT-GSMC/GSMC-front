"use client";

import { usePost } from "@repo/store/postProvider";
import type { post } from "@repo/types/evidences";
import { useRouter } from "next/navigation";

import { Post } from "@/shared/ui";
import Mock from "@shared/mocks/data/evidenceMock.json";

export default function ExampleWidget() {
  const { setPost } = usePost();
  const R = useRouter();
  return (
    <div className="flex mt-[2.69rem] overflow-y-visible flex-wrap sm:justify-start justify-center w-full gap-[1.12rem]">
      {Mock.map((data) => {
        return (
          <Post
            isExample
            data={data as post}
            key={data.id}
            onClick={() => {
              setPost(data as post);
              R.push(`/detail/${data.id}?example=${true}`);
            }}
          />
        );
      })}
    </div>
  );
}
