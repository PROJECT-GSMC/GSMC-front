"use client";

import { Button } from "@repo/shared/button";
import { usePost } from "@repo/store/postProvider";
import type { postState } from "@repo/types/evidences";
import type { PostType } from "@repo/types/postType";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { useGetStudent } from "@/entities/check-post/model/useGetStudent";
import { Post } from "@/entities/check-post/ui/post";

import { useGetPosts } from "../model/useGetPosts";

const PostsView = () => {
  const { setPost } = usePost();
  const [state, setState] = useState<postState>("PENDING");
  const { id } = useParams();
  const R = useRouter();
  const { data, isError } = useGetPosts(String(id), state);
  const { data: data2, isError: isError2 } = useGetStudent(
    decodeURIComponent(String(id))
  );

  const posts: PostType[] | [] = [
    ...(data?.data.majorActivityEvidence ?? []),
    ...(data?.data.humanitiesActivityEvidence ?? []),
    ...(data?.data.readingEvidence ?? []),
    ...(data?.data.otherEvidence ?? []),
  ] as PostType[];

  if (isError) {
    toast.error("게시글을 불러오는 데 실패했습니다.");
  }

  if (isError2) {
    toast.error("사용자 정보를 불러오는 데 실패했습니다.");
  }

  const Buttons = [
    { label: "대기", value: "PENDING" },
    { label: "통과", value: "APPROVE" },
    { label: "거절", value: "REJECT" },
  ];
  return (
    <div className="flex items-center flex-col">
      <h1 className="text-tropicalblue-700 text-body1s sm:text-h4s mb-[2.06rem] mt-[2.94rem]">
        {data2?.data.name ?? "사용자"}님의 게시글
      </h1>
      <div className="flex gap-[5%] justify-between">
        {Buttons.map((button) => (
          <Button
            key={button.value}
            label={button.label}
            variant={state === button.value ? "blue" : "skyblue"}
            // eslint-disable-next-line react/jsx-no-bind
            onClick={() => {
              setState(button.value as postState);
            }}
          />
        ))}
      </div>
      <div className="flex flex-wrap justify-center">
        {posts.length > 0 ? (
          posts.map((post: PostType) => (
            <Post
              data={post}
              key={post.id}
              // eslint-disable-next-line react/jsx-no-bind
              onClick={() => {
                R.push(`/detail/${post.id}`);
                setPost(post);
              }}
            />
          ))
        ) : (
          <p className="w-full text-center mt-4 text-gray-400">
            게시글이 없습니다.
          </p>
        )}
      </div>
    </div>
  );
};

export default PostsView;
