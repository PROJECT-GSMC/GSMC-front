import type { DraftType } from "@repo/types/draft";
import type { PostType } from "@repo/types/evidences";
import { getCategoryName } from "@repo/utils/handleCategory";
import { isActivity, isOthers, isReading } from "@repo/utils/handlePost";
import { handleState, handleStateColor } from "@repo/utils/handleState";
import Image from "next/image";

interface PostProps {
  data: PostType | DraftType;
  isExample?: boolean;
  onClick?: () => void;
}

const Post = ({ data, isExample = false, onClick }: PostProps) => {

  const title = (() => {
    if ("title" in data) return data.title;
    if ("evidenceType" in data) return data.evidenceType
    return null;
  })();

  const imageUri = isActivity(data) ? data.imageUri : null;

  const state = "status" in data ? data.status : null;

  const subTitle = (() => {
    if (isReading(data)) return `${data.author}`;
    if (isOthers(data)) return getCategoryName(data.categoryName);
    if (isActivity(data)) return getCategoryName(data.categoryName);
    return null;
  })();

  return (
    <article
      className="flex flex-col w-[188px] cursor-pointer rounded-[0.625rem]"
      onClick={onClick}
    >
      <div className="flex items-center justify-center bg-gray-400 w-full h-[150px] rounded-t-[0.625rem] overflow-hidden">
        {imageUri == null ? null : (
          <Image
            alt="gsmc"
            className="object-cover rounded-t-[0.625rem]"
            height={150}
            src={imageUri}
            width={188}
          />
        )}
      </div>

      <section className="px-[0.38rem] py-[0.75rem]">
        <h3 className="text-body2 mb-[1rem] min-h-6 leading-6 line-clamp-2">
          {title}
        </h3>
        <p className="text-gray-400 text-body5 mb-[0.75rem] min-h-12 leading-6 line-clamp-2">
          {subTitle}
        </p>
        {!isExample && state ?
          <span className={`text-body5 ${handleStateColor(state)} `}>
            {handleState(state)}
          </span> : null}
      </section>
    </article>
  );
};

export default Post;
