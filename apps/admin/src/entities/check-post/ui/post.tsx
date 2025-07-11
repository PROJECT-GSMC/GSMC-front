"use client";

import type { PostType } from "@repo/types/evidences";
import { getCategoryName } from "@repo/utils/handleCategory";
import { isActivity, isOthers, isReading } from "@repo/utils/handlePost";
import { handleState, handleStateColor } from "@repo/utils/handleState";
import Image from "next/image";

interface PostProps {
  data: PostType;
  onClick?: () => void;
}

const Post = ({ data, onClick }: PostProps) => {
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
          {isActivity(data) || isOthers(data)
            ? getCategoryName(data.categoryName)
            : ("author" in data
              ? data.author
              : "")}
        </p>
        <span className={`text-body5 ${handleStateColor(data.status)}`}>
          {handleState(data.status)}
        </span>
      </section>
    </article>
  );
};

export default Post;
