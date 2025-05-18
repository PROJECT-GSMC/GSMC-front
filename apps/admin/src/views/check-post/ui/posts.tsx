"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@repo/shared/button";

import Header from "../../../shared/ui/header";
import { Post } from "../../../entities/check-post/ui/post";
import { useGetPosts } from "../model/useGetPosts";
import { postState } from "@repo/types/evidences";
import { PostType } from "@repo/types/postType";
import { useParams, useRouter } from "next/navigation";
import { usePost } from "@repo/store/postProvider";

const PostsView = () => {
  const { setPost } = usePost();
  const [state, setState] = useState<postState>("PENDING");
  const params = useParams();
  const R = useRouter();
  const { data, isError, error } = useGetPosts(String(params.id), state);

  const posts: PostType[] = [
    ...data?.data?.majorActivityEvidence,
    ...data?.data?.humanitiesActivityEvidence,
    ...data?.data?.readingEvidence,
    ...data?.data?.otherEvidence,
  ];

  if (isError) {
    console.error(error);
    toast.error("게시글을 불러오는 데 실패했습니다.");
  }

  return (
    <div className="flex items-center flex-col">
      <Header />
      <div className="w-full max-w-[37.5rem] px-[1rem] sm:px-[0rem]">
        <h1 className="text-tropicalblue-700 text-body1s sm:text-h4s mb-[2.06rem] mt-[2.94rem]">
          모태환님의 글
        </h1>
        <div className="flex gap-[5%] justify-between">
          <Button
            onClick={() => setState("APPROVE")}
            variant={state === "APPROVE" ? "blue" : "skyblue"}
            label="통과"
          />
          <Button
            onClick={() => setState("REJECT")}
            variant={state === "REJECT" ? "blue" : "skyblue"}
            label="거절"
          />
          <Button
            onClick={() => setState("PENDING")}
            variant={state === "PENDING" ? "blue" : "skyblue"}
            label="대기"
          />
        </div>
        <div className="flex flex-wrap justify-center">
          {posts ? (
            posts.map((post: PostType) => (
              <Post
                onClick={() => {
                  R.push(`/detail/${post.id}`);
                  setPost(post);
                }}
                key={post.id}
                data={post}
              />
            ))
          ) : (
            <p className="w-full text-center mt-4 text-gray-400">
              게시글이 없습니다.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostsView;
