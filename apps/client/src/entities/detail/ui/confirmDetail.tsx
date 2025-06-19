"use client";

import { useCallback } from "react";
import { toast } from "sonner";

import { deletePost } from "../api/deletePost";
import { useRouter } from "next/navigation";

interface ConfirmDetailProps {
  setShow: (show: boolean) => void;
  show: boolean;
  id: number;
}

export default function ConfirmDetail({
  show,
  setShow,
  id,
}: ConfirmDetailProps) {
  const R = useRouter();
  const handleClose = useCallback(() => {
    setShow(false);
  }, [setShow]);

  const handleDelete = useCallback(() => {
    void (async () => {
      const res = await deletePost(id);
      if (res.status === 204) {
        toast.success("게시글이 삭제되었습니다");
        R.push("/posts");
      } else {
        toast.error("게시글 삭제 실패하였습니다");
      }
    })();
  }, [id]);
  if (!show) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white py-[1rem] px-[1.5rem] rounded-lg shadow-lg max-w-sm w-full">
        <div className="p-[1rem]">
          <h3 className="text-titleSmall font-bold mb-2">게시글 삭제</h3>
          <p className="my-5 text-gray-400">이 게시글을 삭제하시겠습니까?</p>
          <div className="flex mt-2 text-body4">
            <button
              className=" w-full text-tropicalblue-500 text-md"
              onClick={handleClose}
            >
              취소
            </button>
            <button
              className="w-full text-md text-errors-500"
              onClick={handleDelete}
            >
              삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
