"use client";

import { Button } from "@repo/ui/button";
import { useGetPosts } from "../model/useGetPosts";
import { useState } from "react";
import { postState } from "../../../../../../packages/ui/src/types/evidences";
import Header from "../../../shared/ui/header";
import Post from "../../../entities/check-post/ui/post";
import { PostType } from "../../../../../client/src/entities/posts/model/postType";
import { toast } from "sonner";

const PostsWidget = () => {
  const [state, setState] = useState<postState | "">("");
  const { isError, data } = useGetPosts();

  if (isError) {
    toast.error("게시글을 불러오지 못했습니다.");
  }

  const filteredPosts = data?.filter((post: PostType) => post.status === state);

  return (
    <div className="flex items-center flex-col">
      <Header />
      <div className="w-full max-w-[37.5rem]">
        <h1 className="text-tropicalblue-700 text-h4s mb-[2.06rem] mt-[2.94rem]">
          모태환님의 글
        </h1>
        <div className="flex gap-[5%] justify-between">
          <Button
            onClick={() => setState("APPROVE")}
            variant={state === "APPROVE" ? "blue" : "skyblue"}
            label="통과"
            isActive
          />
          <Button
            onClick={() => setState("REJECT")}
            variant={state === "REJECT" ? "blue" : "skyblue"}
            isActive
            label="거절"
          />
          <Button
            onClick={() => setState("PENDING")}
            variant={state === "PENDING" ? "blue" : "skyblue"}
            isActive
            label="대기"
          />
        </div>
        <div className="flex flex-wrap">
          {filteredPosts && filteredPosts.length > 0 ? (
            filteredPosts.map((post) => <Post key={post.id} data={post} />)
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

export default PostsWidget;
