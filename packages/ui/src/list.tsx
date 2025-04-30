"use client"

import Filtered from "./filtered";

interface ListProps {
  children: React.ReactNode;
  title: string;
  className?: string;
  onClick?: () => void;
}

const List = ({ children, title, className, onClick }: ListProps) => {
  return (
    <div className="h-full min-h-[27.8125rem] max-h-[46.1875rem] px-[2.25rem] py-[3.5rem] bg-tropicalblue-100 rounded-[1.25rem]">
      <div className="flex justify-between items-center">
        <h4 className={`${className} text-tropicalblue-700 text-titleSmall`}>
          {title}
        </h4>
        <span className="cursor-pointer" onClick={onClick}>
          <Filtered />
        </span>
      </div>
      <div className="overflow-y-auto flex flex-col h-full">{children}</div>
    </div>
  );
};

export default List;
