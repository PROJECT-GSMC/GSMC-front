"use client";

import { Button } from "@repo/shared/button";
import { Input } from "@repo/shared/input";
import { InputContainer } from "@repo/shared/inputContainer";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

import { Dropdown, File, Textarea } from "@/shared/ui";
import { getDefaultValues } from "@/widgets/edit/lib/getDefaultValues";
import { getEditConfig } from "@/widgets/edit/model/config";
import type { EditFormProps, FormValues, Option } from "@/widgets/edit/types/types";

const EditForm = ({ type, post }: EditFormProps) => {
  const router = useRouter();
  const config = getEditConfig(
    type as "major" | "humanities" | "reading" | "others"
  );

  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: getDefaultValues(
      type as "major" | "humanities" | "reading" | "others",
      post
    ),
  });

  const file = useWatch<FormValues>({ control, name: "file" });

  const handleFormSubmit = useCallback(
    async (data: FormValues) => {
      try {
        await config.onSubmit(data, post.id);
        toast.success("수정이 완료되었습니다.");
        router.back();
      } catch {
        toast.error("수정에 실패했습니다.");
      }
    },
    [config, post.id, router]
  );

  const handleReviseSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      void handleSubmit(handleFormSubmit)(e);
    },
    [handleSubmit, handleFormSubmit]
  );

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);



  if (type === "others") {
    return (
      <div className="flex flex-col items-center">
        <div className="px-4 flex-col justify-center w-full max-w-[37.5rem]">
          <h1 className="text-tropicalblue-700 text-title4s sm:text-titleMedium my-[1rem] sm:my-[2.38rem] mb-6">
            {config.title}
          </h1>
          <div className="flex flex-col gap-[2rem]">
            <div className="p-4 bg-gray-100 rounded-lg">
              <p className="text-gray-600">
                기타 증빙 자료는 현재 수정 기능을 지원하지 않습니다.
              </p>
              {"categoryName" in post && (
                <p className="text-sm text-gray-500 mt-2">
                  카테고리: {post.categoryName}
                </p>
              )}
              {"evidenceType" in post && (
                <p className="text-sm text-gray-500">
                  유형: {post.evidenceType}
                </p>
              )}
            </div>
            <div className="w-full flex flex-col gap-[0.69rem] text-[0.875rem] mb-[2rem] mt-[4rem]">
              <Button
                label="뒤로가기"
                type="button"
                variant="blue"
                onClick={handleBack}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="px-4 flex-col justify-center w-full max-w-[37.5rem]">
        <h1 className="text-tropicalblue-700 text-title4s sm:text-titleMedium my-[1rem] sm:my-[2.38rem] mb-6">
          {config.title}
        </h1>
        <form
          className="flex sm:gap-[2rem] gap-[1.5rem] flex-col"
          onSubmit={handleReviseSubmit}
        >
          {(type === "major" || type === "humanities") &&
            config.categoryOptions ? <Controller<FormValues>
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
            rules={{
              required: "카테고리를 선택해주세요.",
            }}
          /> : null}

          <InputContainer label="제목">
            <Input<FormValues>
              control={control}
              name="title"
              rules={{
                required: "제목을 입력해주세요.",
              }}
            />
          </InputContainer>

          {type === "reading" && (
            <>
              <InputContainer label="저자">
                <Input<FormValues>
                  control={control}
                  name="author"
                  rules={{
                    required: "저자를 입력해주세요.",
                  }}
                />
              </InputContainer>
              <InputContainer label="페이지">
                <Input<FormValues>
                  control={control}
                  name="page"
                  rules={{
                    required: "페이지를 입력해주세요.",
                  }}
                />
              </InputContainer>
            </>
          )}

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

          {(type === "major" || type === "humanities") && (
            <Controller<FormValues>
              control={control}
              name="file"
              // eslint-disable-next-line react/jsx-no-bind
              render={({ field: { value, onChange, ...field } }) => (
                <File
                  label="이미지 (변경하지 않으려면 비워두세요)"
                  value={value as File}
                  onChange={onChange}
                  {...field}
                />
              )}
            />
          )}

          <div className="w-full flex flex-col gap-[0.69rem] text-[0.875rem] mb-[2rem] mt-[4rem]">
            <Button
              label="수정 완료"
              state={isValid ? "default" : "disabled"}
              type="submit"
              variant="blue"
            />
            <Button
              label="취소"
              type="button"
              variant="skyblue"
              onClick={handleBack}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditForm;
