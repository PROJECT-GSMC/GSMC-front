"use client";

import type { post } from "@repo/types/evidences";
import { getCategoryName } from "@repo/utils/handleCategory";
import { isActivity, isOthers, isReading } from "@repo/utils/handlePost";
import { handleState, handleStateColor } from "@repo/utils/handleState";
import Image from "next/image";


import { useChangeEvidenceState } from "@/views/check-post/model/useChangeEvidenceState";

interface PostProps {
  data: post;
  onClick?: () => void;
}

const Post = ({ data, onClick }: PostProps) => {
  const { handlePostState } = useChangeEvidenceState(Number(data.id));

  return (
    <article
      className="flex flex-col w-[188px] cursor-pointer rounded-[0.625rem] h-[276px]"
      onClick={onClick}
    >
      <div className="bg-gray-400 w-full h-[150px] rounded-t-[0.625rem] overflow-hidden">
        {isActivity(data) && data.imageUri != null ? (
          <Image
            alt={data.title}
            className="object-cover w-[188px] h-[150px] rounded-t-[0.625rem]"
            height={150}
            src={data.imageUri}
            width={188}
          />
        ) : null}
      </div>
      <section className="px-[0.38rem] py-[0.75rem]">
        <h3 className="text-body2 mb-[1rem] line-clamp-2">
          {isActivity(data) || isReading(data) ? data.title : null}
        </h3>
        <p className="text-gray-400 text-body5 mb-[0.75rem] line-clamp-2">
          {isActivity(data) || isOthers(data) ? getCategoryName(data.categoryName) : ("author" in data ? data.author : "")}
        </p>
        {data.status === "PENDING" ? (
          <span className="flex w-full mt-[1.25rem] gap-[1rem] items-center justify-center text-body5 text-white">
            <button
              className="bg-tropicalblue-500 px-[1.25rem] rounded-[0.5rem] py-[0.625rem] flex-1"
              onClick={handlePostState("APPROVE")}
            >
              통과
            </button>
            <button
              className="bg-errors-500 px-[1.25rem] rounded-[0.5rem] py-[0.625rem] flex-1"
              onClick={handlePostState("REJECT")}
            >
              거절
            </button>
          </span>
        ) : (
          <span className={`text-body5 ${handleStateColor(data.status)}`}>
            {handleState(data.status)}
          </span>
        )}
      </section>
    </article>
  );
};

export default Post;