"use client";

import { Controller, useForm } from "react-hook-form";

import { Button } from "@repo/shared/button";
import { Input } from "@repo/shared/input";
import { InputContainer } from "@repo/widgets/inputContainer";

import { Book } from "../model/book";
import { Header, Textarea } from "@/shared/ui";
import { useState } from "react";
import { handleSubmitBook } from "../lib/handleBookSubmit";
import { useRouter } from "next/navigation";

const BookView = () => {
  const [submit, setSubmit] = useState<"submit" | "draft">("submit");
  const R = useRouter();
  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm<Book>({ mode: "onChange" });
  return (
    <div className="flex flex-col items-center">
      <Header />
      <div className="px-4  justify-center w-full max-w-[37.5rem]">
        <h1 className="text-tropicalblue-700 text-title4s my-[1rem] sm:my-[2.38rem] mb-6 sm:text-titleMedium">
          독서 영역
        </h1>
        <form
          onSubmit={handleSubmit(async (data) => {
            const res = await handleSubmitBook(data, submit);
            if (res) R.push("/");
          })}
          className="flex gap-[2rem] flex-col"
        >
          <InputContainer label="제목">
            <Input
              name="title"
              control={control}
              defaultValue=""
              rules={{
                required: "제목을 입력해주세요.",
              }}
            />
          </InputContainer>
          <InputContainer label="저자">
            <Input
              name="author"
              defaultValue=""
              control={control}
              rules={{
                required: "저자를 입력해주세요.",
              }}
            />
          </InputContainer>
          <InputContainer label="페이지">
            <Input
              name="page"
              control={control}
              defaultValue={0}
              rules={{
                required: "페이지를 입력해주세요.",
              }}
            />
          </InputContainer>
          <Controller
            name="content"
            defaultValue=""
            control={control}
            rules={{
              required: "내용을 입력해주세요.",
              minLength: {
                value: 600,
                message: "600자 이상 입력해주세요.",
              },
            }}
            render={({ field }) => <Textarea isBook {...field} />}
          />

          <div className="w-full flex flex-col gap-[0.69rem] text-[0.875rem] mb-[2rem] mt-[4rem]">
            <Button
              type="submit"
              onClick={() => setSubmit("draft")}
              variant="skyblue"
              label="임시저장"
            />
            <Button
              onClick={() => setSubmit("submit")}
              type="submit"
              state={isValid ? "default" : "disabled"}
              variant="blue"
              label="작성 완료"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookView;
