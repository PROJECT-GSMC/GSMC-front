import { useCallback } from "react";

import { Chain } from "@/shared/asset/svg/chain";

interface FileProps {
  isImg?: boolean;
  onChange: (file: File) => void;
  value?: File;
  label: string;
}

const File = ({ isImg = true, value, onChange, label }: FileProps) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) onChange(file);
    },
    [onChange],
  );

  return (
    <div className="w-full flex flex-col gap-[0.5rem]">
      <label className="text-label" htmlFor={label}>
        {label}
      </label>
      <label
        className="bg-white flex font-[0.875rem] text-[#B4B5B7] border gap-[0.5rem] rounded-[0.75rem] cursor-pointer w-full mt-[0.69rem] py-[0.91rem] px-[1rem] overflow-hidden"
        htmlFor={label}
      >
        <Chain />
        <span className="truncate max-w-full">
          {value ? value.name : "파일 첨부"}
        </span>
      </label>
      <input
        accept={isImg ? "image/*" : "*/*"}
        className="hidden"
        id={label}
        type="file"
        onChange={handleChange}
      />
    </div>
  );
};

export default File;
