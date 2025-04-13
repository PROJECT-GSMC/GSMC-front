import { useState } from "react";
import Checked from "../../../shared/asset/svg/checked";
import { on } from "events";

interface CheckboxProps {
  check?: boolean;
  onChange?: (checked: boolean) => void;
}

const Checkbox = ({ check, onChange }: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isChecked2, setIsChecked2] = useState(check || false);
  return (
    <div className="flex flex-col gap-[1.25rem]">
      <h3 className="text-label">토익사관학교 이수 여부</h3>
      <div className="flex gap-[1rem]">
        <div
          onClick={() => {
            setIsChecked(!isChecked);
            onChange && onChange(!isChecked);
          }}
          className="flex cursor-pointer"
        >
          <Checked isChecked={isChecked} />
          &nbsp; 참여
        </div>
        <div
          onClick={() => {
            setIsChecked2(!isChecked2);
            onChange && onChange(!isChecked2);
          }}
          className="flex cursor-pointer"
        >
          <Checked isChecked={isChecked2} />
          &nbsp; 미참여
        </div>
      </div>
    </div>
  );
};

export default Checkbox;
