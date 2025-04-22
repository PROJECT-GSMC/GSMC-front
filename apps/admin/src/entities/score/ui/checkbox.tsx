"use client";

import { useState } from "react";
import Checked from "../../../shared/asset/svg/checked";

interface CheckboxProps {
  check?: boolean;
  onChange?: (checked: boolean | null) => void;
}

const Checkbox = ({ check, onChange }: CheckboxProps) => {
  const [checked, setChecked] = useState<boolean | null>(check ?? null);

  const handleClick = (value: boolean) => {
    const newValue = checked === value ? null : value;
    setChecked(newValue);
    if (onChange) onChange(newValue);
  };

  return (
    <div className="flex flex-col gap-[1.25rem]">
      <h3 className="text-label">토익사관학교 이수 여부</h3>
      <div className="flex gap-[1rem]">
        <div onClick={() => handleClick(true)} className="flex cursor-pointer">
          <Checked isChecked={checked === true} />
          &nbsp; 참여
        </div>
        <div onClick={() => handleClick(false)} className="flex cursor-pointer">
          <Checked isChecked={checked === false} />
          &nbsp; 미참여
        </div>
      </div>
    </div>
  );
};

export default Checkbox;
