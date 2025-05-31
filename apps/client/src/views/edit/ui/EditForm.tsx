"use client";

import { Controller, useForm, useWatch } from "react-hook-form";
import { Button } from "@repo/shared/button";
import { Input } from "@repo/shared/input";
import { InputContainer } from "@repo/shared/inputContainer";
import { Dropdown, File, Header, Textarea } from "@/shared/ui";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { EditFormProps, FormValues, Option } from "@/widgets/edit/types/types";
import { getEditConfig } from "@/widgets/edit/model/config";
import { getDefaultValues } from "@/widgets/edit/lib/getDefaultValues";

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

  const handleFormSubmit = async (data: FormValues) => {
    try {
      await config.onSubmit(data, post.id);
      toast.success("수정이 완료되었습니다.");
      router.back();
    } catch (error: unknown) {
      console.error(error);
      toast.error("수정에 실패했습니다.");
    }
  };

  if (type === "others") {
    return (
      <div className="flex flex-col items-center">
        <Header />
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
                type="button"
                onClick={() => router.back()}
                variant="blue"
                label="뒤로가기"
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
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          {(type === "major" || type === "humanities") &&
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

          <InputContainer label="제목">
            <Input<FormValues>
              name="title"
              control={control}
              rules={{
                required: "제목을 입력해주세요.",
              }}
            />
          </InputContainer>

          {type === "reading" && (
            <>
              <InputContainer label="저자">
                <Input<FormValues>
                  name="author"
                  control={control}
                  rules={{
                    required: "저자를 입력해주세요.",
                  }}
                />
              </InputContainer>
              <InputContainer label="페이지">
                <Input<FormValues>
                  name="page"
                  control={control}
                  rules={{
                    required: "페이지를 입력해주세요.",
                  }}
                />
              </InputContainer>
            </>
          )}

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

          {(type === "major" || type === "humanities") && (
            <Controller<FormValues>
              name="file"
              control={control}
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
              type="submit"
              state={isValid ? "default" : "disabled"}
              variant="blue"
              label="수정 완료"
            />
            <Button
              type="button"
              onClick={() => router.back()}
              variant="skyblue"
              label="취소"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditForm;
