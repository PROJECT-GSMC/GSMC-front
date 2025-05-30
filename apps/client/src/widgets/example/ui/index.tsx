"use client";

import { Post } from "@/shared/ui";
import { usePost } from "@repo/store/postProvider";
import Mock from "@shared/mocks/data/evidenceMock.json";
import { useRouter } from "next/navigation";
import { post } from "@repo/types/evidences";

export default function ExampleWidget() {
  const { setPost } = usePost();
  const R = useRouter();
  return (
    <div className="flex mt-[2.69rem] overflow-y-visible flex-wrap sm:justify-start justify-center w-full gap-[1.12rem]">
      {Mock.map((data) => {
        return (
          <Post
            onClick={() => {
              setPost(data as post);
              R.push(`/detail/${data.id}?example=${true}`);
            }}
            key={data.id}
            data={data as post}
            isExample={true}
          />
        );
      })}
    </div>
  );
}
