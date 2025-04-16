"use client";

import { useForm, Controller, useWatch } from "react-hook-form";
import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import Header from "../../../shared/ui/header";
import Semester from "../../../shared/ui/semester";
import Dropdown from "../../../shared/ui/dropdown";
import Textarea from "../../../shared/ui/textarea";
import File from "../../../shared/ui/file";
import { Activity } from "../../../shared/types/activity";
import { sendActivity } from "../../../shared/api/sendActivity";
import { toast } from "sonner";
import { majorCategoryOptions } from "../model/category";
import { InputContainer } from "@repo/ui/widgets/inputContainer/index";

interface FormValues extends Omit<Activity, "categoryName"> {
  categoryName: { name: string; send: string };
}

const MajorWidget = () => {
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
      activityType: "MAJOR",
    };
    try {
      await sendActivity(finalData);
      toast.success("글 제출을 성공했습니다");
    } catch (e) {
      toast.error("글 제출을 실패했습니다");
      console.error(e);
    }
  };
  return (
    <div className="flex flex-col items-center">
      <Header />
      <form
        className="flex gap-[2rem] flex-col justify-center w-full max-w-[37.5rem]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-tropicalblue-700 text-titleMedium my-[2.38rem]">
          전공 영역
        </h1>
        <Controller
          name="categoryName"
          defaultValue={{ name: "", send: "" }}
          control={control}
          rules={{
            required: "카테고리를 선택해주세요.",
          }}
          render={({ field }) => (
            <Dropdown
              label="카테고리"
              options={majorCategoryOptions}
              {...field}
            />
          )}
        />
        <Controller
          name="semester"
          control={control}
          defaultValue={0}
          rules={{
            required: "학기를 선택해주세요.",
          }}
          render={({ field }) => <Semester {...field} />}
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
          rules={{
            required: "파일을 선택해주세요.",
          }}
          render={({ field }) => <File label="이미지" {...field} />}
        />
        <div className="w-full flex flex-col gap-[0.69rem] text-[0.875rem] mb-[2rem] mt-[4rem]">
          <Button isActive variant="skyblue" label="임시저장" />
          <Button isActive={isValid} variant="blue" label="작성 완료" />
        </div>
      </form>
    </div>
  );
};

export default MajorWidget;
