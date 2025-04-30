import { Button } from "@repo/ui/button";
import { Search } from "@entities/member/ui/search";

interface FilterPropps {
  ChangeGrade: (grade: number) => void;
  grade: number;
  ChangeClass: (classNumber: number) => void;
  classNumber: number;
  ChangeName: (name: string) => void;
  name: string;
}

export const Filter = ({
  ChangeGrade,
  grade,
  ChangeClass,
  classNumber,
  ChangeName,
  name
}: FilterPropps) => {
  return (
    <>
      <h3 className="text-titleSmall text-tropicalblue-700 mb-[2.2rem]">
        필터
      </h3>
      <Search ChangeName={ChangeName} name={name} />
      <div>
        <h5 className="text-tropicalblue-700 text-label mt-[3.06rem]">학년</h5>
        <div className="grid grid-cols-3 gap-3 mt-[1.5rem]">
          <Button
            onClick={() => ChangeGrade(1)}
            variant={grade === 1 ? "blue" : "skyblue"}
            label="1"
          />
          <Button
            onClick={() => ChangeGrade(2)}
            variant={grade === 2 ? "blue" : "skyblue"}
            label="2"
          />
          <Button
            onClick={() => ChangeGrade(3)}
            variant={grade === 3 ? "blue" : "skyblue"}
            label="3"
          />
        </div>
      </div>
      <div className="flex flex-col gap-[1.38rem] mt-[2.19rem]">
        <h5 className="text-tropicalblue-700 text-label">반</h5>
        <div className="grid grid-cols-3 gap-3">
          <Button
            onClick={() => ChangeClass(1)}
            variant={classNumber === 1 ? "blue" : "skyblue"}
            label="1"
          />
          <Button
            onClick={() => ChangeClass(2)}
            variant={classNumber === 2 ? "blue" : "skyblue"}
            label="2"
          />
          <Button
            onClick={() => ChangeClass(3)}
            variant={classNumber === 3 ? "blue" : "skyblue"}
            label="3"
          />
          <Button
            onClick={() => ChangeClass(4)}
            variant={classNumber === 4 ? "blue" : "skyblue"}
            label="4"
          />
        </div>
      </div>
    </>
  );
};

export default Filter;
