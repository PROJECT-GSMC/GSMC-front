"use client";

import Checked from "@shared/asset/svg/checked";
import { useCallback, useState } from "react";

interface CheckboxProps {
  check?: boolean;
  onChange?: (checked: boolean | null) => void;
}

export const Checkbox = ({ check, onChange }: CheckboxProps) => {
  const [checked, setChecked] = useState<boolean | null>(check ?? null);

  const handleClick = useCallback(
    (value: boolean) => {
      const newValue = checked === value ? null : value;
      setChecked(newValue);
      if (onChange) onChange(newValue);
    },
    [checked, onChange],
  );

  return (
    <div className="flex flex-col sm:gap-[1.25rem] gap-[0.5rem]">
      <h3 className="text-label">토익사관학교 이수 여부</h3>
      <div className="flex gap-[1rem]">
        <div
          className="flex cursor-pointer"
          // eslint-disable-next-line react/jsx-no-bind
          onClick={() => {
            handleClick(true);
          }}
        >
          <Checked isChecked={checked === true} />
          &nbsp; 참여
        </div>
        <div
          className="flex cursor-pointer"
          // eslint-disable-next-line react/jsx-no-bind
          onClick={() => {
            handleClick(false);
          }}
        >
          <Checked isChecked={checked === false} />
          &nbsp; 미참여
        </div>
      </div>
    </div>
  );
};
