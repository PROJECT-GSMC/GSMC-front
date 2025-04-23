"use client";

import { Input } from "@repo/ui/input";
import { Controller, useForm, useWatch } from "react-hook-form";
import Dropdown from "../../../shared/ui/dropdown";
import { foreignOptions } from "../model/foreignOptions";
import File from "../../../shared/ui/file";
import { ForeignForm } from "../model/foreign";
import { Button } from "@repo/ui/button";
import Header from "../../../shared/ui/header";
import { InputContainer } from "@repo/ui/widgets/inputContainer/index";
import { chooseDropdownOption } from "../lib/chooseDropdownOption";
import { sendForeign } from "../api/sendForeign";

const ForeignFormWidget = () => {
  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm<ForeignForm>({ mode: "onChange" });

  const category = useWatch({
    control,
    name: "categoryName",
  });

  const onSubmit = (data: ForeignForm) => {
    sendForeign(data.categoryName.send, data.value.send, data.file);
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
        <div className="flex flex-col w-full gap-[2rem] max-w-[37.5rem]">
          <h1 className="text-tropicalblue-700 mt-[2.37rem] text-titleMedium">
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
              render={({ field }) => (
                <Dropdown
                  label="단계"
                  options={chooseDropdownOption(category?.name)}
                  {...field}
                />
              )}
            />
          ) : (
            <InputContainer label="점수">
              <Input
                type="number"
                control={control}
                name="value"
                rules={{ required: "점수를 입력해주세요" }}
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

        {/* 버튼 영역 */}
        <div className="flex flex-col gap-[0.81rem] mb-[3.38rem]">
          <Button variant="skyblue" label="임시저장" />
          <Button
            state={isValid ? "default" : "disabled"}
            variant="blue"
            label="작성 완료"
          />
        </div>
      </form>
    </div>
  );
};

export default ForeignFormWidget;
