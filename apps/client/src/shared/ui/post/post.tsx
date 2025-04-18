import { PostType } from "../../../entities/posts/model/postType";
import Image from "next/image";

interface PostProps {
  data: PostType;
  isExample?: boolean;
}

const Post = ({ data, isExample = true }: PostProps) => {
  const handleState = (state: string) => {
    if (state === "APPROVE") return "통과";
    if (state === "REJECT") return "탈락";
    if (state === "PENDING") return "대기중..";
    return "임시저장 글";
  };

  const handleStateColor = (state: string) => {
    if (state === "APPROVE") return "text-tropicalblue-500";
    if (state === "REJECT") return "text-[#DF454A]";
    if (state === "PENDING") return "text-tropicalblue-800";
    return "text-gray-500";
  };

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
