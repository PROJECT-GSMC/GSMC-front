"use client";

import type { Draft } from "@repo/types/draft";
import type { post } from "@repo/types/evidences";
import { getCategoryName } from "@repo/utils/handleCategory";
import { handleState, handleStateColor } from "@repo/utils/handleState";
import Image from "next/image";

interface PostProps {
  data: post | Draft;
  isExample?: boolean;
  onClick?: () => void;
}

const Post = ({ data, isExample = false, onClick }: PostProps) => {
  let title = "제목";
  let subTitle = "소제목";
  let imageUri: string | undefined;
  let state = "PENDING";

  if ("evidenceType" in data) {
    title = data.evidenceType;
    subTitle = data.categoryName;
    state = data.status;
  } else {
    title = data.title;
    state = data.status;
    if ("author" in data) {
      subTitle = data.author;
    } else if ("categoryName" in data) {
      subTitle = getCategoryName(data.categoryName);
    }
  }
  if ("imageUri" in data) {
    imageUri = data.imageUri;
  }

  return (
    <article
      className="flex flex-col w-[188px] cursor-pointer rounded-[0.625rem] h-[276px]"
      onClick={onClick}
    >
      <div className="bg-gray-400 w-full h-[150px] rounded-t-[0.625rem] overflow-hidden">
        {(imageUri == null) ? null : (
          <Image
            alt={title}
            className="object-cover w-[188px] h-[150px] rounded-t-[0.625rem]"
            height={150}
            src={imageUri}
            width={188}
          />
        )}
      </div>

      <section className="px-[0.38rem] py-[0.75rem]">
        <h3 className="text-body2 mb-[1rem] line-clamp-2">{title}</h3>
        <p className="text-gray-400 text-body5 mb-[0.75rem] line-clamp-2">
          {subTitle}
        </p>
        {!isExample && (
          <span className={`text-body5 ${handleStateColor(state)}`}>
            {handleState(state)}
          </span>
        )}
      </section>
    </article>
  );
};

export default Post;
