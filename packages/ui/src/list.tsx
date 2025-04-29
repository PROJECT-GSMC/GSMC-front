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
    <div className="max-w-[37.5rem] h-full min-h-[27.8125rem] px-[2.25rem] max-h-[46.1875rem] py-[3.5rem] bg-tropicalblue-100 rounded-[1.25rem]">
      <div className="flex justify-between items-center">
        <h4 className={`text-tropicalblue-700 ${className} text-titleSmall`}>
          {title}
        </h4>
        <span className="md:hidden cursor-pointer" onClick={onClick}>
          <Filtered />
        </span>
      </div>
      <div className="overflow-y-auto flex flex-col h-full">{children}</div>
    </div>
  );
};

export default List;
