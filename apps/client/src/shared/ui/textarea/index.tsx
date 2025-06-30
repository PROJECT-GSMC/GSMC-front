"use client";

import { useState, useEffect, useCallback } from "react";

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

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setLength(e.target.value.length);
      onChange(e);
    },
    [setLength, onChange],
  );

  return (
    <div className="flex flex-col gap-3">
      <div>
        <label className="text-label" htmlFor="textarea">
          내용
        </label>
        <label htmlFor="textarea">
          {" "}
          ({" "}
          <span
            className={`${
              length === 0 ? "text-black" : "text-tropicalblue-500"
            }`}
          >
            {length}
          </span>{" "}
          )
        </label>
      </div>

      <div className="rounded-[1rem] border border-gray-300 focus-within:border-tropicalblue-400">
        <div className="overflow-hidden rounded-[1rem]">
          <textarea
            className="resize-none w-full min-h-[20rem] px-[1.5rem] py-[1.25rem] focus:outline-none border-none"
            id="textarea"
            name="textarea"
            placeholder={
              isBook
                ? "600자 이상 입력"
                : "사진 첨부 시 200자, 사진 미첨부 시 400자 이상 입력"
            }
            value={value}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Textarea;
