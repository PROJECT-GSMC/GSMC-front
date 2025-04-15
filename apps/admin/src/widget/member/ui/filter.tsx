import { Button } from "@repo/ui/button";
import { Search } from "../../../entities/member/ui/search";

export const Filter = () => {
  return (
    <div className="w-[350px] bg-tropicalblue-100 py-[2.25rem] rounded-[1.25rem] h-[90vh] px-[2.45rem]">
      <h3 className="text-titleSmall text-tropicalblue-700 mb-[2.2rem]">필터</h3>
      <Search />
      <div>
        <h5 className="text-tropicalblue-700 text-label mt-[3.06rem]">학년</h5>
        <div className="flex  justify-between mt-[1.5rem]">
          <Button variant="skyblue" className="w-[25%]" label="1" />
          <Button variant="skyblue" className="w-[25%]" label="2" />
          <Button variant="skyblue" className="w-[25%]" label="3" />
        </div>
      </div>
      <div className="flex flex-col gap-[1.38rem] mt-[2.19rem]">
        <h5 className="text-tropicalblue-700 text-label">반</h5>
        <div className="flex justify-between mt">
          <Button variant="skyblue" className="w-[25%]" label="1" />
          <Button variant="skyblue" className="w-[25%]" label="2" />
          <Button variant="skyblue" className="w-[25%]" label="3" />
        </div>
        <Button variant="skyblue" className="w-[25%]" label="4" />
      </div>
    </div>
  );
};

export default Filter;
