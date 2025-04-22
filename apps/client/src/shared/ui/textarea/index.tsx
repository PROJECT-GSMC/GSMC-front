import { useState } from "react";

interface TextareaProps {
  isBook?: boolean;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Textarea = ({ isBook = false, onChange }: TextareaProps) => {
  const [length, setLength] = useState(0);
  return (
    <div>
      <div>
        <label className="text-label" htmlFor="textarea">
          내용
        </label>
        <label htmlFor="textarea">
          {" "}
          ({" "}
          <span
            className={`${length === 0 ? "text-black" : "text-tropicalblue-500"}`}
          >
            {length}
          </span>{" "}
          )
        </label>
      </div>
      <textarea
        onChange={(e) => {
          setLength(e.target.value.length);
          onChange(e);
        }}
        className=" resize-none w-full min-h-[20rem] border mt-[0.69rem]  rounded-[1rem] px-[1.5rem] py-[1.25rem] focus:  focus:outline-tropicalblue-400"
        name="textarea"
        placeholder={
          isBook
            ? "600자 이상 입력"
            : "사진 첨부 시 200자, 사진 미첨부 시 400자 이상 입력"
        }
        id="textarea"
      />
    </div>
  );
};

export default Textarea;
