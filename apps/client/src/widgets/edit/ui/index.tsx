"use client";

import { Button } from "@repo/shared/button";
import { Input } from "@repo/shared/input";
import { InputContainer } from "@repo/shared/inputContainer";
import type { Activity, Others, Reading } from "@repo/types/evidences";
import { useMutation } from "@tanstack/react-query";
import { HttpStatusCode } from "axios";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

import type { ConfigType } from "@/shared/model/config";
import type { HttpError } from "@/shared/model/error";
import { Dropdown, File, Textarea } from "@/shared/ui";
import { getDefaultValues } from "@/widgets/edit/lib/getDefaultValues";
import { getEditConfig } from "@/widgets/edit/model/editConfig";
import type {
  EditFormProps,
  FormValues,
  Option,
} from "@/widgets/edit/types/types";
import { getWriteConfig } from "@/widgets/write/model/writeConfig";



const EditForm = ({ type, post }: EditFormProps) => {
  const router = useRouter();
  const isDraft = "draftId" in post;

  const config = getEditConfig(type as ConfigType);
  const draftConfig = getWriteConfig(type as ConfigType);

  const { mutate } = useMutation({
    mutationFn: (data: FormValues) => isDraft ?
      draftConfig.onSubmit({ ...data, draftId: post.draftId }, "submit") :
      config.onSubmit(data, Number(post.id)),
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
    defaultValues: getDefaultValues(
      type as ConfigType,
      post as Activity | Reading | Others,
    ),
  });

  const file = useWatch<FormValues>({ control, name: "file" });

  const handleFormSubmit = useCallback((data: FormValues) => {
    mutate(data)
    router.back()
  }, [mutate, router]);

  const handleReviseSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    void handleSubmit(handleFormSubmit)(e);
  }, [handleSubmit, handleFormSubmit]);

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
              rules={{
                required: "카테고리를 선택해주세요.",
              }}
            />
          ) : null}

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
              label={isDraft ? "작성 완료" : "수정 완료"}
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
