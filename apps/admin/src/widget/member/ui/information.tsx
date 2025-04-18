import { Button } from "@repo/ui/button";
import { Member } from "../model/member";

interface InformationProps {
  student: Member;
}

export const Information = ({ student }: InformationProps) => {
  return (
    <div className="w-[350px] min-w-[18rem] bg-tropicalblue-100 py-[2.25rem] flex flex-col justify-between rounded-[1.25rem] h-[46rem] px-[2.45rem]">
      <h3 className="text-titleSmall text-tropicalblue-700 mb-[3.5rem]">
        인적사항
      </h3>
      <div>
        <div className="flex flex-col gap-[0.5rem]">
          <span className="text-body1 text-gray-600">{student?.name}</span>
          <small className="text-body2 text-gray-600">{`${student?.grade}학년 ${student?.classNumber}반 ${student?.number}번`}</small>
        </div>
        <div className="text-tropicalblue-700 mt-[1.25rem] mb-[2.56rem] text-titleMedium w-[17rem] h-[20rem] flex items-center justify-center rounded-[0.75rem] bg-white">
          {student?.totalScore + "점"}
        </div>
      </div>
      <div className="flex flex-col gap-[0.75rem]">
        <Button isActive variant="blue" label="글 보러가기" />
        <Button isActive variant="skyblue" label="점수 관리" />
      </div>
    </div>
  );
};
