"use client";

import { Button } from "@repo/shared/button";
import { Input } from "@repo/shared/input";
import { InputContainer } from "@repo/shared/inputContainer";
import { useMutation } from "@tanstack/react-query";
import { HttpStatusCode } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useRef } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

import type { ConfigType } from "@/shared/model/config";
import type { HttpError } from "@/shared/model/error";
import { Dropdown, File, Textarea } from "@/shared/ui";
import type { Option } from "@/shared/ui/dropdown";
import type { FormValues } from "@/widgets/edit/types/types";
import { chooseDropdownOption } from "@/widgets/write/lib/chooseDropdownOption";

import { getWriteConfig } from "../model/writeConfig";



export default function WriteForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const type = searchParams.get("type") as ConfigType
  const config = getWriteConfig(type);

  const submitTypeRef = useRef<"draft" | "submit">("submit");

  const { mutate } = useMutation({
    mutationFn: (data: FormValues) => config.onSubmit(data, submitTypeRef.current),
    onSuccess: (data) => {
      if (data.status === 201) {
        toast.success("증빙자료를 성공적으로 저장하였습니다.")
        router.push("/");
      }
    },
    onError: (error: HttpError) => {
      if (error.httpStatus === HttpStatusCode.NotFound) {
        toast.error("해당 증빙 자료가 존재하지 않습니다.");
      } else if (error.httpStatus === HttpStatusCode.UnprocessableEntity) {
        toast.error("더 이상 증빙 자료를 추가할 수 없습니다.");
      } else {
        toast.error("증빙 자료 추가에 실패했습니다.");
      }
    }
  })

  const {
    handleSubmit,
    control,
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

  const category = useWatch({ control, name: "categoryName", });

  const needDropdown =
    category?.name === "OPIC" ||
    category?.name === "TOEIC SPEAKING" ||
    category?.name === "HSK";

  const handleFormSubmit = useCallback((data: FormValues) => {
    mutate(data)
  }, [mutate]);

  const handleWriteSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    void handleSubmit(handleFormSubmit)();
  }, [handleFormSubmit, handleSubmit]);

  const ChangeStatusDraft = useCallback(() => {
    submitTypeRef.current = "draft";
  }, []);

  const ChangeStatusWrite = useCallback(() => {
    submitTypeRef.current = "submit";
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="px-4 flex-col justify-center w-full max-w-[37.5rem]">
        <h1 className="text-tropicalblue-700 text-title4s sm:text-titleMedium my-[1rem] sm:my-[2.38rem] mb-6">
          {config.title}
        </h1>
        <form
          className="flex sm:gap-[2rem] gap-[1.5rem] flex-col"
          onSubmit={handleWriteSubmit}
        >
          {(type === "major" || type === "humanities" || type === "foreign") &&
            config.categoryOptions ? (
            <Controller<FormValues>
              control={control}
              name="categoryName"
              // eslint-disable-next-line react/jsx-no-bind
              render={({ field: { value, onChange, ...field } }) => (
                <Dropdown
                  label="카테고리"
                  options={config.categoryOptions ?? []}
                  value={value as Option}
                  onChange={onChange}
                  {...field}
                />
              )}
              rules={{ required: "카테고리를 선택해주세요." }}
            />
          ) : null}
          {type === "foreign" && needDropdown ? (
            <Controller<FormValues>
              control={control}
              name="value"
              // eslint-disable-next-line react/jsx-no-bind
              render={({ field: { value, onChange, ...field } }) => (
                <Dropdown
                  label="카테고리"
                  options={chooseDropdownOption(category.name)}
                  value={value as Option}
                  onChange={onChange}
                  {...field}
                />
              )}
              rules={{ required: "카테고리를 선택해주세요." }}
            />
          ) : null}

          {type !== "foreign" && (
            <InputContainer label="제목">
              <Input<FormValues>
                control={control}
                name="title"
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
                    control={control}
                    name="author"
                    rules={{
                      required: "저자를 입력해주세요.",
                    }}
                  />
                </InputContainer>
              )}
              <InputContainer label={type === "reading" ? "페이지" : "점수"}>
                <Input<FormValues>
                  control={control}
                  name={type === "reading" ? "page" : "value"}
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
              control={control}
              name="content"
              // eslint-disable-next-line react/jsx-no-bind
              render={({ field: { value, onChange, ...field } }) => (
                <Textarea
                  isBook={type === "reading"}
                  value={value as string}
                  onChange={onChange}
                  {...field}
                />
              )}
              rules={{
                required: "내용을 입력해주세요.",
                minLength: {
                  value: type === "reading" ? 600 : (file == null ? 400 : 200),
                  message:
                    type === "reading"
                      ? "600자 이상 입력해주세요."
                      : (file == null
                        ? "내용을 400자 이상 입력해주세요."
                        : "내용을 200자 이상 입력해주세요."),
                },
              }}
            />
          )}

          {(type === "major" ||
            type === "humanities" ||
            type === "foreign") && (
              <Controller<FormValues>
                control={control}
                name="file"
                // eslint-disable-next-line react/jsx-no-bind
                render={({ field: { value, onChange, ...field } }) => (
                  <File
                    label="이미지"
                    value={value as File}
                    onChange={onChange}
                    {...field}
                  />
                )}
                rules={{
                  ...(type === "foreign" && {
                    required: "파일을 첨부해주세요.",
                  }),
                }}
              />
            )}

          <div className="w-full flex flex-col gap-[0.69rem] text-[0.875rem] mb-[2rem] mt-[4rem]">
            {type !== "foreign" && (
              <Button
                label="임시저장"
                state={isValid ? "default" : "disabled"}
                type="submit"
                value="draft"
                variant="skyblue"
                onClick={ChangeStatusDraft}
              />
            )}
            <Button
              label="제출"
              state={isValid ? "default" : "disabled"}
              type="submit"
              value="submit"
              variant="blue"
              onClick={ChangeStatusWrite}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
