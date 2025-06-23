import { Button } from "@repo/shared/button";

import Search from "@/entities/member/ui/search";

interface FilterProps {
  ChangeGrade: (grade: number) => void;
  grade: number;
  ChangeClass: (classNumber: number) => void;
  classNumber: number;
  ChangeName: (name: string) => void;
  name: string;
}

const gradeList = [1, 2, 3];
const classList = [1, 2, 3, 4];

export const Filter = ({
  ChangeGrade,
  grade,
  ChangeClass,
  classNumber,
  ChangeName,
  name,
}: FilterProps) => {
  return (
    <>
      <h3 className="text-titleSmall text-tropicalblue-700 mb-[2.2rem]">
        필터
      </h3>
      <Search ChangeName={ChangeName} name={name} />
      <div>
        <h5 className="text-tropicalblue-700 text-label mt-[3.06rem]">학년</h5>
        <div className="grid grid-cols-3 gap-3 mt-[1.5rem]">
          {gradeList.map((gradeNum) => (
            <Button
              key={gradeNum}
              label={gradeNum.toString()}
              variant={gradeNum === grade ? "blue" : "skyblue"}
              // eslint-disable-next-line react/jsx-no-bind
              onClick={function () {
                ChangeGrade(gradeNum);
              }}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-[1.38rem] mt-[2.19rem]">
        <h5 className="text-tropicalblue-700 text-label">반</h5>
        <div className="grid grid-cols-3 gap-3">
          {classList.map((classNum) => (
            <Button
              key={classNum}
              label={classNum.toString()}
              variant={classNum === classNumber ? "blue" : "skyblue"}
              // eslint-disable-next-line react/jsx-no-bind
              onClick={function () {
                ChangeClass(classNum);
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Filter;
