"use client";

import { useState, useEffect } from "react";

interface TextareaProps {
  isBook?: boolean;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Textarea = ({ isBook = false, value = "", onChange }: TextareaProps) => {
  const [length, setLength] = useState(value.length);

  useEffect(() => {
    setLength(value.length);
  }, [value]);

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
        className=" resize-none w-full min-h-[20rem] border mt-[0.69rem]  rounded-[1rem] px-[1.5rem] py-[1.25rem] focus:  focus:outline-tropicalblue-400"
        id="textarea"
        name="textarea"
        placeholder={
          isBook
            ? "600자 이상 입력"
            : "사진 첨부 시 200자, 사진 미첨부 시 400자 이상 입력"
        }
        value={value}
        onChange={(e) => {
          setLength(e.target.value.length);
          onChange(e);
        }}
      />
    </div>
  );
};

export default Textarea;
