"use client";

import { Dropdown, File, Header, Textarea } from "@/shared/ui";
import { Option } from "@/shared/ui/dropdown";
import { FormValues } from "@/widgets/edit/types/types";
import { Button } from "@repo/shared/button";
import { Input } from "@repo/shared/input";
import { InputContainer } from "@repo/shared/inputContainer";
import { useRouter, useSearchParams } from "next/navigation";
import { Controller, useForm, useWatch } from "react-hook-form";
import { getWriteConfig } from "../model/writeConfig";
import { chooseDropdownOption } from "@/widgets/write/lib/chooseDropdownOption";
import { useRef } from "react";

export default function WriteForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const type = searchParams.get("type");
  const config = getWriteConfig(
    type as "major" | "humanities" | "reading" | "others" | "foreign"
  );

  const submitTypeRef = useRef<"draft" | "submit">("submit");

  const {
    handleSubmit,
    control,
    getValues,
    formState: { isValid },
  } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      title: "",
      content: "",
      categoryName: {
        name: "",
        send: "",
      },
      file: undefined,
    },
  });
  const file = useWatch<FormValues>({ control, name: "file" });
  const category = useWatch({
    control,
    name: "categoryName",
  });

  const needDropdown =
    category?.name === "OPIC" ||
    category?.name === "TOEIC SPEAKING" ||
    category?.name === "HSK";

  const handleFormSubmit = async (data: FormValues) => {
    await config.onSubmit(data, submitTypeRef.current);
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center">
      <Header />
      <div className="px-4 flex-col justify-center w-full max-w-[37.5rem]">
        <h1 className="text-tropicalblue-700 text-title4s sm:text-titleMedium my-[1rem] sm:my-[2.38rem] mb-6">
          {config.title}
        </h1>
        <form
          className="flex sm:gap-[2rem] gap-[1.5rem] flex-col"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          {(type === "major" || type === "humanities" || type === "foreign") &&
            config.categoryOptions && (
              <Controller<FormValues>
                name="categoryName"
                control={control}
                rules={{
                  required: "카테고리를 선택해주세요.",
                }}
                render={({ field: { value, onChange, ...field } }) => (
                  <Dropdown
                    label="카테고리"
                    options={config.categoryOptions || []}
                    value={value as Option}
                    onChange={onChange}
                    {...field}
                  />
                )}
              />
            )}
          {type === "foreign" && needDropdown && (
            <Controller<FormValues>
              name="value"
              control={control}
              rules={{
                required: "카테고리를 선택해주세요.",
              }}
              render={({ field: { value, onChange, ...field } }) => (
                <Dropdown
                  label="카테고리"
                  options={chooseDropdownOption(category.name) || []}
                  value={value as Option}
                  onChange={onChange}
                  {...field}
                />
              )}
            />
          )}

          {type !== "foreign" && (
            <InputContainer label="제목">
              <Input<FormValues>
                name="title"
                control={control}
                rules={{
                  required: "제목을 입력해주세요.",
                }}
              />
            </InputContainer>
          )}

          {(type === "reading" || (type === "foreign" && !needDropdown)) && (
            <>
              {type === "reading" && (
                <InputContainer label="저자">
                  <Input<FormValues>
                    name="author"
                    control={control}
                    rules={{
                      required: "저자를 입력해주세요.",
                    }}
                  />
                </InputContainer>
              )}
              <InputContainer label={type === "reading" ? "페이지" : "점수"}>
                <Input<FormValues>
                  name={type === "reading" ? "page" : "value"}
                  control={control}
                  rules={{
                    required:
                      type === "reading"
                        ? "페이지를 입력해주세요."
                        : "점수를 입력해주세요.",
                  }}
                />
              </InputContainer>
            </>
          )}

          {type !== "foreign" && (
            <Controller<FormValues>
              name="content"
              control={control}
              rules={{
                required: "내용을 입력해주세요.",
                minLength: {
                  value: type === "reading" ? 600 : file ? 200 : 400,
                  message:
                    type === "reading"
                      ? "600자 이상 입력해주세요."
                      : file
                        ? "내용을 200자 이상 입력해주세요."
                        : "내용을 400자 이상 입력해주세요.",
                },
              }}
              render={({ field: { value, onChange, ...field } }) => (
                <Textarea
                  isBook={type === "reading"}
                  value={value as string}
                  onChange={onChange}
                  {...field}
                />
              )}
            />
          )}

          {(type === "major" ||
            type === "humanities" ||
            type === "foreign") && (
            <Controller<FormValues>
              name="file"
              control={control}
              rules={{
                ...(type === "foreign" && {
                  required: "파일을 첨부해주세요.",
                }),
              }}
              render={({ field: { value, onChange, ...field } }) => (
                <File
                  label="이미지"
                  value={value as File}
                  onChange={onChange}
                  {...field}
                />
              )}
            />
          )}

          <div className="w-full flex flex-col gap-[0.69rem] text-[0.875rem] mb-[2rem] mt-[4rem]">
            {type !== "foreign" && (
              <Button
                value="draft"
                state="default"
                onClick={() => {
                  handleFormSubmit(getValues());
                }}
                variant="skyblue"
                label="임시저장"
              />
            )}
            <Button
              value="submit"
              type="submit"
              onClick={() => {
                submitTypeRef.current = "submit";
              }}
              variant="blue"
              label="제출"
              state={isValid ? "default" : "disabled"}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
