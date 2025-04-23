"use client";

import Image from "next/image";
import {
  handleState,
  handleStateColor,
} from "../../../../../../packages/ui/src/utils/handleState";
import {
  Others,
  Reading,
  Activity,
} from "../../../../../../packages/ui/src/types/evidences";
import {
  isActivity,
  isReading,
  isOthers,
} from "../../../../../../packages/ui/src/utils/handlePost";

interface PostProps {
  data: Activity | Reading | Others;
  isExample?: boolean;
}

const Post = ({ data, isExample = false }: PostProps) => {
  return (
    <div className="flex flex-col w-[188px] rounded-[0.625rem] h-[276px]">
      <div className="bg-gray-400 w-full h-[150px] rounded-t-[0.625rem] overflow-hidden">
        {isActivity(data) && data.imageUrl && (
          <Image
            src={data.imageUrl}
            width={188}
            height={150}
            alt={data.title}
            className="object-cover w-[188px] h-[150px] rounded-t-[0.625rem]"
          />
        )}
      </div>

      <div className="px-[0.38rem] py-[0.75rem]">
        {(isActivity(data) || isReading(data)) && (
          <h3 className="text-body2 mb-[1rem]">{data.title}</h3>
        )}
        <p className="text-gray-400 text-body5 mb-[0.75rem]">
          {isActivity(data) || isOthers(data)
            ? data.categoryName
            : isReading(data)
              ? data.author
              : ""}
        </p>
        {!isExample && (
          <span className={`text-body5 ${handleStateColor(data.status)}`}>
            {handleState(data.status)}
          </span>
        )}
      </div>
    </div>
  );
};

export default Post;
