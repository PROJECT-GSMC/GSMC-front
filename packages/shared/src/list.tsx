"use client"

import type React from "react";

import { Filtered } from "./filtered.js";

interface ListProps {
  children: React.ReactNode;
  title: string;
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
    <div className="h-full px-[2.25rem] py-[3.5rem] bg-tropicalblue-100 rounded-[1.25rem]">
      <div className="flex justify-between items-center">
        <h4 className={`${className ?? ""} text-tropicalblue-700 text-titleSmall`}>
          {title}
        </h4>
        {isFilter ? (
          <span className="cursor-pointer" onClick={onClick}>
            <Filtered />
          </span>
        ) : null}
      </div>
      <div className="overflow-y-auto flex flex-col h-full">{children}</div>
    </div>
  );
};

export { List };
