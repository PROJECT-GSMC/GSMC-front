import { removeCertification } from "@repo/api/deleteCertification";
import { useCallback, useState } from "react";
import { toast } from "sonner";

import ConfirmModal from "./confirmModal.tsx";

interface CardProps {
  front: string;
  back?: string | number;
  onClick?: () => void;
  id: string | number;
  Pending?: boolean;
  className?: string;
}

const Card = ({
  front,
  back,
  onClick,
  id,
  Pending,
  className = "",
}: CardProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleDelete = async () => {
    try {
      const res = await removeCertification(id);
      if (res.status === 204) {
        toast.success("자격증이 삭제되었습니다.");
        globalThis.location.reload();
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error);
      }
      toast.error("자격증 삭제에 실패했습니다.");
    }
  };

  const handleModalOpen = useCallback(() => {
    setModalOpen(true);
  }, []);

  return (
    <div
      onClick={onClick ?? undefined}
      className={`flex justify-between w-[100%] cursor-pointer h-[69px] text-gray-600 text-label py-[1.5rem] px-[2rem] ${className}`}
    >
      <div className="flex items-center gap-1">
        <span className="line-clamp-1">{front}</span>
        {Pending === true && <span className="text-errors-500">*</span>}
      </div>

      {back === undefined ? (
        <svg
          onClick={handleModalOpen}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
        >
          <path
            d="M19 4.5H15.5L14.5 3.5H9.5L8.5 4.5H5V6.5H19M6 19.5C6 20.0304 6.21071 20.5391 6.58579 20.9142C6.96086 21.2893 7.46957 21.5 8 21.5H16C16.5304 21.5 17.0391 21.2893 17.4142 20.9142C17.7893 20.5391 18 20.0304 18 19.5V7.5H6V19.5Z"
            fill="#DF454A"
          />
        </svg>
      ) : typeof back == "number" ? (
        <p className="tabular-nums">{back}</p>
      ) : (
        back
      )}
      {modalOpen ? (
        <ConfirmModal
          cancel={{
            label: "취소",
            onClick: () => {
              setModalOpen(false);
            },
          }}
          confirm={{
            label: "삭제",
            onClick: () => {
              setModalOpen(false);
              void handleDelete();
            },
          }}
          description="정말 자격증을 삭제 하시겠습니까?"
          title="자격증 삭제"
        />
      ) : null}
    </div>
  );
};

export default Card;
