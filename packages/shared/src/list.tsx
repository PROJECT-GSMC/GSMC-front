"use client";

import type React from "react";

import { Filtered } from "./filtered.tsx";

interface ListProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  isFilter?: boolean;
  onClick?: () => void;
}

const List = ({
  children,
  title,
  className,
  isFilter = false,
  onClick,
}: ListProps) => {
  return (
    <div className={`px-[2.25rem] py-[3.5rem] bg-tropicalblue-100 rounded-[1.25rem] ${className}`}>
      <div className="flex justify-between items-center">
        <h4 className="text-tropicalblue-700 text-titleSmall">
          {title}
        </h4>
        {isFilter ? (
          <span
            className="cursor-pointer"
            onClick={onClick}
          >
            <Filtered />
          </span>
        ) : null}
      </div>
      <div className="flex flex-col h-full overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default List;
