"use client";

import { useRouter } from "next/navigation";
import { Button } from "@repo/shared/button";
import { Member } from "../model/member";

interface InformationProps {
  student: Member;
}

export const Information = ({ student }: InformationProps) => {
  const R = useRouter();
  return (
    <div className="flex flex-col h-full bg-tropicalblue-100 rounded-[1.25rem] px-[2.45rem] py-[2.25rem] justify-between ">
      <h3 className="text-titleSmall text-tropicalblue-700 my-3">인적사항</h3>
      <div className="overflow-y-auto">
        <div>
          <div className="flex flex-col gap-[0.5rem]">
            <span className="text-body1 text-gray-600">{student?.name}</span>
            <small className="text-body2 text-gray-600">{`${student?.grade}학년 ${student?.classNumber}반 ${student?.number}번`}</small>
          </div>
          <div className="text-tropicalblue-700 mt-[1.25rem] md:mb-[2.56rem] sm:mb-[1.75rem] mb-[3rem] text-titleMedium h-[32rem] max-md:h-[10rem] max-lg:h-[10rem] flex items-center justify-center rounded-[0.75rem] bg-white">
            {student?.totalScore + "점"}
          </div>
        </div>
        <div className="flex flex-col gap-[0.75rem]">
          <Button
            variant="blue"
            onClick={() => R.push(`/check-post/${student.email}`)}
            label="글 보러가기"
          />
          <Button
            variant="skyblue"
            onClick={() => R.push(`/score/${student.email}`)}
            label="점수 관리"
          />
        </div>
      </div>
    </div>
  );
};
