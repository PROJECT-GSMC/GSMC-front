import { Button } from "@repo/ui/button";
import { Search } from "@entities/member/ui/search";

interface FilterPropps {
  ChangeGrade: (grade: number) => void;
  grade: number;
  ChangeClass: (classNumber: number) => void;
  classNumber: number;
}

const Filter = ({
  ChangeGrade,
  grade,
  ChangeClass,
  classNumber,
}: FilterPropps) => {
  return (
    <div className="w-[350px] min-w-[18rem] bg-tropicalblue-100 py-[2.25rem] rounded-[1.25rem] h-[46rem] px-[2.45rem]">
      <h3 className="text-titleSmall text-tropicalblue-700 mb-[2.2rem]">
        필터
      </h3>
      <Search />
      <div>
        <h5 className="text-tropicalblue-700 text-label mt-[3.06rem]">학년</h5>
        <div className="flex  justify-between mt-[1.5rem]">
          <Button
            onClick={() => ChangeGrade(1)}
            variant={grade === 1 ? "blue" : "skyblue"}
            className="w-[25%]"
            label="1"
          />
          <Button
            onClick={() => ChangeGrade(2)}
            variant={grade === 2 ? "blue" : "skyblue"}
            className="w-[25%]"
            label="2"
          />
          <Button
            onClick={() => ChangeGrade(3)}
            variant={grade === 3 ? "blue" : "skyblue"}
            className="w-[25%]"
            label="3"
          />
        </div>
      </div>
      <div className="flex flex-col gap-[1.38rem] mt-[2.19rem]">
        <h5 className="text-tropicalblue-700 text-label">반</h5>
        <div className="flex justify-between mt">
          <Button
            onClick={() => ChangeClass(1)}
            variant={classNumber === 1 ? "blue" : "skyblue"}
            className="w-[25%]"
            label="1"
          />
          <Button
            onClick={() => ChangeClass(2)}
            variant={classNumber === 2 ? "blue" : "skyblue"}
            className="w-[25%]"
            label="2"
          />
          <Button
            onClick={() => ChangeClass(3)}
            variant={classNumber === 3 ? "blue" : "skyblue"}
            className="w-[25%]"
            label="3"
          />
        </div>
        <Button
          onClick={() => ChangeClass(4)}
          variant={classNumber === 4 ? "blue" : "skyblue"}
          className="w-[25%]"
          label="4"
        />
      </div>
    </div>
  );
};

export default Filter;
