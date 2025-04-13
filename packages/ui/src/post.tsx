import { PostType } from "../../../apps/client/src/entities/posts/model/postType";

interface PostProps {
  data: PostType;
  isExample?: boolean;
}

const Post = ({ data, isExample }: PostProps) => {
  const handleState = (state: string) => {
    if (state === "APPROVE") return "승인됨";
    if (state === "REJECT") return "거절됨";
    if (state === "PENDING") return "대기중";
    return "임시저장";
  };
  const handleStateColor = (state: string) => {
    if (state === "APPROVE") return "text-green-500";
    if (state === "REJECT") return "text-red-500";
    if (state === "PENDING") return "text-yellow-500";
    return "text-gray-500";
  };
  return (
    <div className="flex flex-col w-[188px] rounded-[0.625rem] h-[276px] ">
      {data.imageUrl ? (
        <img className="h-[150px]" src={data.imageUrl} alt={data.title} />
      ) : (
        <div className="bg-gray-400 w-full h-[150px] rounded-t-[0.625rem]"></div>
      )}
      <div className="px-[0.38rem] py-[0.75rem]">
        <h3 className="text-body2 mb-[1rem]">{data.title}</h3>
        <p className="text-gray-400 text-body5 mb-[0.75rem]">
          {data.categoryName}
        </p>
        {isExample && (
          <span
            className={`text-body5 text-[${handleStateColor(data.status)}]`}
          >
            {handleState(data.status)}
          </span>
        )}
      </div>
    </div>
  );
};

export default Post;
