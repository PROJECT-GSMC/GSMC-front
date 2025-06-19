import type { PostType } from "@repo/types/postType";
import { handleState, handleStateColor } from "@repo/utils/handleState";
import Image from "next/image";
import { useCallback } from "react";
import { toast } from "sonner";

import { changeEvidenceState } from "../api/changeEvidenceState";

interface PostProps {
  data: PostType;
  onClick?: () => void;
}

export const Post = ({ data, onClick }: PostProps) => {
  const handleApprove = useCallback(async () => {
    try {
      await changeEvidenceState(data.id, "APPROVE");
    } catch {
      toast.error("게시글 상태 변경에 실패했습니다.");
    }
  }, [data.id]);

  const handleReject = useCallback(() => {
    void changeEvidenceState(data.id, "REJECT");
  }, [data.id]);

  return (
    <div
      className="flex cursor-pointer flex-col w-[188px] rounded-[0.625rem] h-[276px]"
      onClick={onClick}
    >
      {data.imageUri ? (
        <Image
          alt={data.title}
          className="object-cover w-[188px] rounded-t-[0.625rem] h-[150px]"
          height={170}
          src={data.imageUri}
          style={{ objectFit: "cover" }}
          width={188}
        />
      ) : (
        <div className="bg-gray-400 w-full h-[150px] rounded-t-[0.625rem]" />
      )}
      <div className="px-[0.38rem] py-[0.75rem]">
        <h3 className="text-body2 mb-[1rem]">{data.title}</h3>
        <p className="text-gray-400 text-body5 mb-[0.75rem]">
          {data.categoryName}
        </p>
        {data.status === "PENDING" ? (
          <div className="mt-[1.25rem] flex gap-[1rem] items-center justify-center text-body5 w-full text-white">
            <button
              className="bg-tropicalblue-500 px-[1.25rem] rounded-[0.5rem] py-[0.625rem]"
              // eslint-disable-next-line react/jsx-no-bind
              onClick={() => void handleApprove()}
            >
              통과
            </button>
            <button
              className="bg-errors-500 px-[1.25rem] rounded-[0.5rem] py-[0.625rem]"
              onClick={handleReject}
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
