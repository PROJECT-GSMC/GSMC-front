"use client";

import { Controller, useForm, useWatch } from "react-hook-form";

import { Button } from "@repo/shared/button";
import { Input } from "@repo/shared/input";
import { InputContainer } from "@repo/widgets/inputContainer";

import { CharacterCategory } from "../model/category";

import { Activity } from "@shared/types/activity";
import { handleSubmitActivity } from "@/shared/lib/handleSubmitActivity";
import { useState } from "react";
import { Dropdown, File, Header, Textarea } from "@/shared/ui";
import { useRouter } from "next/navigation";

interface FormValues extends Omit<Activity, "categoryName"> {
  categoryName: { name: string; send: string };
}

const HumanityView = () => {
  const [submitType, setSubmitType] = useState<"submit" | "draft">("submit");
  const R = useRouter();
  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm<FormValues>({ mode: "onChange" });

  const file = useWatch({ control, name: "file" });

  const onSubmit = async (data: FormValues) => {
    const finalData: Activity = {
      ...data,
      categoryName: data.categoryName.send,
      activityType: "HUMANITIES",
    };
    const res = await handleSubmitActivity(finalData, submitType);
    if (res) R.push("/");
  };

  return (
    <div className="flex flex-col items-center">
      <Header />
      <div className="px-4 flex-col justify-center w-full max-w-[37.5rem]">
        <h1 className="text-tropicalblue-700 text-title4s sm:text-titleMedium my-[1rem] sm:my-[2.38rem] mb-6">
          인성 영역
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col sm:gap-[2rem] gap-[1.5rem]"
        >
          <Controller
            name="categoryName"
            control={control}
            rules={{ required: "카테고리를 선택해주세요." }}
            render={({ field }) => (
              <Dropdown
                label="카테고리"
                options={CharacterCategory}
                {...field}
              />
            )}
          />
          <InputContainer label="주제">
            <Input
              name="title"
              defaultValue=""
              control={control}
              rules={{
                required: "주제를 입력해주세요.",
              }}
            />
          </InputContainer>
          <Controller
            name="content"
            control={control}
            rules={{
              required: "내용을 입력해주세요.",
              minLength: {
                value: file ? 200 : 400,
                message: file
                  ? "내용을 200자 이상 입력해주세요."
                  : "내용을 400자 이상 입력해주세요.",
              },
            }}
            render={({ field }) => <Textarea {...field} />}
          />
          <Controller
            name="file"
            control={control}
            render={({ field }) => <File label="이미지" {...field} />}
          />
          <div className="w-full flex flex-col gap-[0.69rem] text-[0.875rem] mb-[2rem] mt-[4rem]">
            <Button
              type="submit"
              onClick={() => setSubmitType("draft")}
              variant="skyblue"
              label="임시저장"
            />
            <Button
              type="submit"
              onClick={() => setSubmitType("submit")}
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

export default HumanityView;
