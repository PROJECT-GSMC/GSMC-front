import { PostType } from "../../../../../../packages/ui/src/types/postType";
import Image from "next/image";
import {
  handleState,
  handleStateColor,
} from "../../../../../../packages/ui/src/utils/handleState";

interface PostProps {
  data: PostType;
  isExample?: boolean;
}

const Post = ({ data, isExample = false }: PostProps) => {
  return (
    <div className="flex flex-col w-[188px] rounded-[0.625rem] h-[276px]">
      {data.imageUrl ? (
        <Image className="h-[150px]" src={data.imageUrl} alt={data.title} />
      ) : (
        <div className="bg-gray-400 w-full h-[150px] rounded-t-[0.625rem]"></div>
      )}
      <div className="px-[0.38rem] py-[0.75rem]">
        <h3 className="text-body2 mb-[1rem]">{data.title}</h3>
        <p className="text-gray-400 text-body5 mb-[0.75rem]">
          {data.categoryName}
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
