"use client";

import { Button } from "@repo/shared/button";
import { Input } from "@repo/shared/input";
import { InputContainer } from "@repo/shared/inputContainer";
import { usePost } from "@repo/store/postProvider";
import { isActivity, isDraft, isReading } from "@repo/utils/handlePost";
import { useMutation } from "@tanstack/react-query";
import { HttpStatusCode } from "axios";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

import type { ConfigType } from "@/shared/model/config";
import type { HttpError } from "@/shared/model/error";
import type { FormValues, Option } from "@/shared/model/formValues";
import { Dropdown, File, Textarea } from "@/shared/ui";
import { getDefaultValues } from "@/widgets/edit/lib/getDefaultValues";
import { getEditConfig } from "@/widgets/edit/model/editConfig";
import { getWriteConfig } from "@/widgets/write/model/writeConfig";

const EditForm = () => {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const { id } = params;
  const typeParam = searchParams.get('type');
  const { post } = usePost();

  const type: ConfigType = useMemo(() => {
    if (!post) {
      throw new Error('Post 데이터가 필요합니다.');
    }

    if (typeParam != null) {
      switch (typeParam) {
        case 'MAJOR': {
          return 'major';
        }
        case 'HUMANITIES': {
          return 'humanities';
        }
        case 'READING': {
          return 'reading';
        }
        case 'FOREIGN_LANGUAGE': {
          return 'others';
        }
        case 'DRAFT': {
          if (isDraft(post)) {
            if (isActivity(post)) {
              return post.activityType.toLowerCase() as ConfigType;
            }
            if (isReading(post)) {
              return 'reading';
            }
          }
          throw new Error('요청하신 타입과 실제 데이터의 타입이 다릅니다.');
        }
        default: {
          throw new Error(`지원되지 않는 타입입니다: ${typeParam}`);
        }
      }
    }
    throw new Error('typeParam이 없습니다.');
  }, [post, typeParam]);

  const editConfig = getEditConfig(type);
  const writeConfig = getWriteConfig(type);

  const { mutate: editMutatation } = useMutation({
    mutationFn: (data: FormValues) => editConfig.onSubmit(data, Number(id)),
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

  const { mutate: draftMutation } = useMutation({
    mutationFn: (data: FormValues) => writeConfig.onSubmit({ ...data, draftId: String(id) }, "submit"),
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
    formState: { isValid, errors },
  } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: getDefaultValues(type, post),
  });

  const file = useWatch<FormValues>({ control, name: "file" });

  const handleEditSubmit = useCallback((data: FormValues) => {
    editMutatation(data)
    router.replace("/posts")
  }, [router, editMutatation]);

  const handleDraftSubmit = useCallback((data: FormValues) => {
    draftMutation(data)
    router.replace("/posts")
  }, [draftMutation, router]);

  const handleReviseSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    if (post && isDraft(post)) {
      void handleSubmit(handleDraftSubmit)(e);
    } else {
      void handleSubmit(handleEditSubmit)(e);
    }
  }, [handleDraftSubmit, handleEditSubmit, handleSubmit, post]);

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <div className="flex flex-col items-center">
      <div className="px-4 flex-col justify-center w-full max-w-[37.5rem]">
        <h1 className="text-tropicalblue-700 text-title4s sm:text-titleMedium my-[1rem] sm:my-[2.38rem] mb-6">
          {writeConfig.title}
        </h1>
        <form
          className="flex sm:gap-[2rem] gap-[1.5rem] flex-col"
          onSubmit={handleReviseSubmit}
        >
          {(type === "major" || type === "humanities") &&
            writeConfig.categoryOptions ? (
            <Controller<FormValues>
              control={control}
              name="categoryName"
              // eslint-disable-next-line react/jsx-no-bind
              render={({ field: { value, onChange, ...field } }) => (
                <Dropdown
                  label="카테고리"
                  options={writeConfig.categoryOptions ?? []}
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

          <InputContainer
            error={errors.title}
            htmlFor="title"
            label="제목"
          >
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
              <InputContainer
                error={errors.author}
                htmlFor="author"
                label="저자"
              >
                <Input<FormValues>
                  control={control}
                  name="author"
                  rules={{
                    required: "저자를 입력해주세요.",
                  }}
                />
              </InputContainer>
              <InputContainer
                error={errors.page}
                htmlFor="page"
                label="페이지
              ">
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
            {post && isDraft(post) ?
              <Button
                label="수정 완료"
                state={isValid ? "default" : "disabled"}
                type="submit"
                variant="blue"
              />
              :
              <Button
                label="작성 완료"
                state={isValid ? "default" : "disabled"}
                type="submit"
                variant="blue"
              />
            }
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