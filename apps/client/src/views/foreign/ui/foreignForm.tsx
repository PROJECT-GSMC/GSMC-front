"use client";

import { Controller, useForm, useWatch } from "react-hook-form";
import { Input } from "@repo/ui/input";
import { Button } from "@repo/ui/button";
import { InputContainer } from "@repo/ui/widgets/inputContainer/index";

import { foreignOptions } from "../model/foreignOptions";
import { chooseDropdownOption } from "../lib/chooseDropdownOption";

import Dropdown from "@shared/ui/dropdown";
import File from "@shared/ui/file";
import Header from "@shared/ui/header";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { sendScore } from "@/shared/api/sendScore";

const ForeignFormView = () => {
  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm<ForeignForm>({ mode: "onChange" });
  const R = useRouter();

  interface ForeignForm {
    categoryName: { name: string; send: string };
    value: { name: string; send: number } | number;
    file: File;
  }

  const category = useWatch({
    control,
    name: "categoryName",
  });

  const onSubmit = async (data: ForeignForm) => {
    console.log("Form data:", data);

    const value =
      typeof data.value === "number" || typeof data.value === "string"
        ? { name: data.value.toString(), send: data.value }
        : data.value;

    console.log("Converted value:", value);

    const res = await sendScore(data.categoryName.send, value.send, data.file);
    if (res) {
      toast.success("외국어 영역이 등록되었습니다.");
      R.push("/");
    } else {
      toast.error("외국어 영역 등록에 실패했습니다.");
    }
  };

  const needDropdown =
    category?.name === "OPIC" ||
    category?.name === "TOEIC SPEAKING" ||
    category?.name === "HSK";

  return (
    <div className="flex flex-col items-center h-[100vh]">
      <Header />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col px-4 w-full justify-between h-full max-w-[37.5rem]"
      >
        <div className="flex flex-col w-full sm:gap-[2rem] gap-[1.5rem] max-w-[37.5rem]">
          <h1 className="text-tropicalblue-700 text-title4s mt-[1.5rem] sm:mt-[2.37rem] sm:text-titleMedium">
            외국어 영역
          </h1>
          <Controller
            control={control}
            name="categoryName"
            rules={{ required: "카테고리를 선택해주세요." }}
            render={({ field }) => (
              <Dropdown label="카테고리" options={foreignOptions} {...field} />
            )}
          />
          {needDropdown ? (
            <Controller
              control={control}
              name="value"
              rules={{ required: "단계를 선택해주세요." }}
              render={({ field }) => {
                const options = chooseDropdownOption(category?.name);
                const selectedOption =
                  typeof field.value === "number"
                    ? options.find((opt) => opt.send === field.value)
                    : field.value;

                return (
                  <Dropdown
                    label="단계"
                    options={options}
                    value={selectedOption}
                    onChange={(val) => field.onChange(val)}
                  />
                );
              }}
            />
          ) : (
            <InputContainer label="점수">
              <Input
                name="value"
                type="number"
                control={control}
                rules={{ required: "점수를 입력해주세요" }}
                defaultValue={0}
              />
            </InputContainer>
          )}

          <Controller
            control={control}
            name="file"
            rules={{ required: "파일을 업로드해주세요." }}
            render={({ field }) => <File label="이미지" {...field} />}
          />
        </div>

        <div className="flex flex-col sm:gap-[0.81rem] gap-[0.5rem] sm:mb-[3.38rem] mb-2">
          <Button
            type="submit"
            state={isValid ? "default" : "disabled"}
            variant="blue"
            label="작성 완료"
          />
        </div>
      </form>
    </div>
  );
};

export default ForeignFormView;
