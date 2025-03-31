import { Chain } from "../../asset/svg/chain";

interface FileProps {
  isImg?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  label: string;
}

const File = ({ isImg = true, value, onChange, label }: FileProps) => {
  return (
    <div className="w-full flex flex-col gap=[0.5rem]">
      <label className="text-label" htmlFor={label}>
        {label}
      </label>
      <label
        className="bg-white flex font-[0.875rem] text-[#B4B5B7] border gap-[0.5rem] rounded-[0.75rem] cursor-pointer w-full mt-[0.69rem] py-[0.91rem] px-[1rem]"
        htmlFor={label}
      >
        <Chain />
        {value ? value : "파일 첨부"}
      </label>
      <input
        onChange={onChange}
        className="hidden"
        id={label}
        value={value}
        type="file"
        accept={isImg ? "image/*" : "*/*"}
      />
    </div>
  );
};

export default File;
