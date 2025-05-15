import Image from "next/image";
import { toast } from "sonner";
import { changeEvidenceState } from "../api/changeEvidenceState";
import { PostType } from "@repo/types/postType";
import {
  handleState,
  handleStateColor,
} from "@repo/utils/handleState";

interface PostProps {
  data: PostType;
  onClick?: () => void;
}

export const Post = ({ data, onClick }: PostProps) => {
  return (
    <div
      onClick={onClick}
      className="flex cursor-pointer flex-col w-[188px] rounded-[0.625rem] h-[276px]"
    >
      {data.imageUrl ? (
        <Image
          src={data.imageUrl}
          width={188}
          height={170}
          alt={data.title}
          className="object-cover w-[188px] rounded-t-[0.625rem] h-[150px]"
          style={{ objectFit: "cover" }}
        />
      ) : (
        <div className="bg-gray-400 w-full h-[150px] rounded-t-[0.625rem]"></div>
      )}
      <div className="px-[0.38rem] py-[0.75rem]">
        <h3 className="text-body2 mb-[1rem]">{data.title}</h3>
        <p className="text-gray-400 text-body5 mb-[0.75rem]">
          {data.categoryName}
        </p>
        {data.status === "PENDING" ? (
          <div className="mt-[1.25rem] flex gap-[1rem] items-center justify-center text-body5 w-full text-white">
            <button
              onClick={async () => {
                try {
                  await changeEvidenceState(data.id, "APPROVE");
                } catch (error) {
                  console.error(error);
                  toast.error("게시글 상태 변경에 실패했습니다.");
                }
              }}
              className="bg-tropicalblue-500 px-[1.25rem] rounded-[0.5rem] py-[0.625rem]"
            >
              통과
            </button>
            <button
              onClick={() => changeEvidenceState(data.id, "REJECT")}
              className="bg-[#DF454A] px-[1.25rem] rounded-[0.5rem] py-[0.625rem]"
            >
              거절
            </button>
          </div>
        ) : (
          <span className={`text-body5 ${handleStateColor(data.status)}`}>
            {handleState(data.status)}
          </span>
        )}
      </div>
    </div>
  );
};
