"use client";

import { Button } from "@repo/shared/button";
import { usePost } from "@repo/store/postProvider";
import type { post, postState } from "@repo/types/evidences";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "sonner";

import { useGetStudent } from "@/entities/check-post/model/useGetStudent";
import Post from "@/entities/check-post/ui/post";
import { useMember } from "@/entities/member/model/memberContext";
import { useGetPosts } from "@/views/check-post/model/useGetPosts";

export default function PostsWidget() {
  const R = useRouter();
  const { id: email } = useParams();
  const [state, setState] = useState<postState>("PENDING");
  const { member: student } = useMember();
  const { data: postsData, isError: isPostsError } = useGetPosts(String(student?.email ?? email), state);
  const { data: studentData, isError: isStudentError } = useGetStudent(decodeURIComponent(String(student?.email ?? email)));
  const { setPost } = usePost();

  const posts: post[] = [
    ...(postsData?.data.majorActivityEvidence ?? []),
    ...(postsData?.data.humanitiesActivityEvidence ?? []),
    ...(postsData?.data.readingEvidence ?? []),
    ...(postsData?.data.otherEvidence ?? []),
  ];

  if (isPostsError) {
    toast.error("게시글을 불러오는 데 실패했습니다.");
  }

  if (isStudentError) {
    toast.error("사용자 정보를 불러오는 데 실패했습니다.");
  }

  const Buttons: { value: postState, label: string }[] = [
    { label: "대기", value: "PENDING" },
    { label: "통과", value: "APPROVE" },
    { label: "거절", value: "REJECT" },
  ];

  const handleState = useCallback((value: postState) => () => {
    setState(value)
  }, [])

  const handleRoute = useCallback((post: post) => () => {
    setPost(post);
    R.push(`/detail/${post.id}?status=${state}`);
  }, [R, setPost, state])

  return (
    <div className="flex w-full items-center flex-col p-[1rem]">
      <div className="max-w-[37.5rem] w-full">
        <h1 className="text-tropicalblue-700 text-body1s sm:text-h4s mb-[2.06rem] mt-[2.94rem]">
          {student?.name ?? studentData?.data.name}님의 게시글
        </h1>
        <div className="flex gap-[5%] justify-between pb-[2rem]">
          {Buttons.map((button) => (
            <Button
              key={button.value}
              label={button.label}
              variant={state === button.value ? "blue" : "skyblue"}
              onClick={handleState(button.value)}
            />
          ))}
        </div>
        <div className="flex flex-wrap overflow-y-visible sm:justify-start justify-center w-full gap-[1.12rem]">
          {posts.length > 0 ? (
            posts.map((post) => (
              <Post
                data={post}
                key={post.id}
                onClick={handleRoute(post)}
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

