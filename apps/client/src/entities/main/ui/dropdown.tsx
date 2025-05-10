import React from "react";

interface DropdownProps {
  children: React.ReactNode;
  isOpen: boolean;
}

const MainDropdown = ({ children, isOpen }: DropdownProps) => {
  return (
    <div
      onFocus={() => (isOpen = true)}
      className={`
      absolute left-0 z-10 
      w-[15rem] max-md:w-[10rem] px-6 md:px-11 py-4 md:py-6 m-[0.1rem]
      rounded-lg sm:rounded-xl bg-tropicalblue-50
      h-auto
      transition-all duration-500 ease-in-out origin-top 
      ${isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-6 pointer-events-none"}
      `}
    >
      <div className="w-full flex flex-col gap-5 text-body3s">{children}</div>
    </div>
  );
};

export default MainDropdown;
