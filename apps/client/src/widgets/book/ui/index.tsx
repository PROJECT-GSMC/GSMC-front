"use client";

import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { Controller, useForm } from "react-hook-form";
import Textarea from "../../../shared/ui/textarea";
import Header from "../../../shared/ui/header";
import Semester from "../../../shared/ui/semester";
import { sendBook } from "../api/sendBook";
import { Book } from "../model/book";
import { toast } from "sonner";

const BookWidget = () => {
  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm<Book>({ mode: "onChange" });
  return (
    <div className="flex flex-col items-center">
      <Header />
      <form
        className="flex gap-[2rem] flex-col justify-center w-full max-w-[37.5rem]"
        onSubmit={handleSubmit(async (data) => {
          try {
            await sendBook(data);
            toast.success("글 제출을 성공했습니다");
          } catch (e) {
            toast.error("글 제출을 실패했습니다");
            console.error(e);
          }
        })}
      >
        <h1 className="text-tropicalblue-700 text-titleMedium my-[2.38rem]">
          독서 영역
        </h1>
        <Controller
          name="title"
          control={control}
          defaultValue=""
          rules={{
            required: "제목을 입력해주세요.",
          }}
          render={({ field }) => <Input label="제목" {...field} />}
        />
        <Controller
          name="author"
          defaultValue=""
          control={control}
          rules={{
            required: "저자를 입력해주세요.",
          }}
          render={({ field }) => <Input label="저자" {...field} />}
        />
        <Controller
          name="page"
          control={control}
          defaultValue={0}
          rules={{
            required: "페이지를 입력해주세요.",
          }}
          render={({ field }) => (
            <Input type="number" label="페이지" {...field} />
          )}
        />
        <Controller
          name="semester"
          defaultValue={0}
          control={control}
          rules={{
            required: "학기를 선택해주세요.",
          }}
          render={({ field }) => <Semester {...field} />}
        />
        <Controller
          name="content"
          defaultValue=""
          control={control}
          rules={{
            required: "내용을 입력해주세요.",
          }}
          render={({ field }) => <Textarea isBook {...field} />}
        />

        <div className="w-full flex flex-col gap-[0.69rem] text-[0.875rem] mb-[2rem] mt-[4rem]">
          <Button
            isActive
            variant={variantStyles["skyblue"]}
            label="임시저장"
          />
          <Button
            isActive={false}
            variant={variantStyles["blue"]}
            label="작성 완료"
          />
        </div>
      </form>
    </div>
  );
};

export default BookWidget;
