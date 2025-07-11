"use client";

import { Button } from "@repo/shared/button";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import { useMember } from "@/entities/member/model/memberContext";
import ScoreModal from "@/entities/member/ui/scoreModal";

export default function Information() {
  const [modal, setModal] = useState(false);
  const R = useRouter();
  const { member: student } = useMember();

  const handleCheckPost = useCallback(() => {
    R.push(`/check-post/${student?.email}`);
  }, [R, student?.email]);

  const handleScore = useCallback(() => {
    R.push(`/score/${student?.email}`);
  }, [R, student?.email]);

  const open = useCallback(() => {
    setModal(true);
  }, []);
  const close = useCallback(() => {
    setModal(false);
  }, []);

  if (student === undefined) {
    return <p className="text-center m-8">로딩중...</p>;
  }

  return (
    <div className="flex flex-col h-full bg-tropicalblue-100 rounded-[1.25rem] px-[2.45rem] py-[2.25rem] justify-between ">
      <h3 className="text-titleSmall text-tropicalblue-700 my-3">인적사항</h3>
      <div className="overflow-y-auto">
        <div>
          <div className="flex flex-col gap-[0.5rem]">
            <span className="text-body1 text-gray-600">{student.name}</span>
            <small className="text-body2 text-gray-600">{`${student.grade}학년 ${student.classNumber}반 ${student.number}번`}</small>
          </div>
          <div
            className="text-tropicalblue-700 cursor-pointer mt-[1.25rem] md:mb-[2.56rem] sm:mb-[1.75rem] mb-[3rem] text-titleMedium h-[32rem] max-md:h-[10rem] max-lg:h-[10rem] flex items-center justify-center rounded-[0.75rem] bg-white"
            onClick={open}
          >
            {student.totalScore + "점"}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-[0.75rem]">
        <Button label="글 보러가기" variant="blue" onClick={handleCheckPost} />
        <Button label="점수 관리" variant="skyblue" onClick={handleScore} />
      </div>
      <ScoreModal
        close={close}
        id={student.email.split("@")[0]?.slice(1) ?? ""}
        show={modal}
      />
    </div>
  );
}
