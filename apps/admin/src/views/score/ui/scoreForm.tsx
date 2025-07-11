"use client";

import { Button } from "@repo/shared/button";
import { Input } from "@repo/shared/input";
import { InputContainer } from "@repo/shared/inputContainer";
import { useMutation } from "@tanstack/react-query";
import { HttpStatusCode } from "axios";
import { useParams, useRouter } from "next/navigation";
import { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Checkbox } from "@/entities/score/ui/checkbox";
import type { HttpError } from "@/shared/model/error";
import Header from "@/shared/ui/header";

import { patchScore } from "../api/patchScore";
import type { ScoreFormType } from "../model/score";
import { SCORE_CATEGORIES } from "../model/score_category";


const ScoreForm = () => {
  const { id } = useParams();
  const router = useRouter();

  const { handleSubmit, control, formState: { isValid, errors } } = useForm<ScoreFormType>({
    mode: "onChange",
  });

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const renderCheckbox = useCallback(({ field }: {
    field: { value?: boolean; onChange: (value: boolean | null) => void };
  }) => <Checkbox {...field} />, []);

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: ScoreFormType) => {
      return Promise.all(
        Object.values(SCORE_CATEGORIES).map(async (category) => {
          const score = data[category.field as keyof ScoreFormType];
          return patchScore(
            decodeURIComponent(String(id)),
            category.value,
            typeof score === "boolean" ? (score ? 0 : 1) : score
          );
        })
      );
    },
    onSuccess: () => {
      toast.success("모든 점수 부여 성공");
      router.push("/");
    },
    onError: (error: HttpError) => {
      if (error.httpStatus == HttpStatusCode.NotFound) {
        toast.error("해당하는 카테고리가 존재하지 않습니다.");
      } else {
        toast.error("점수 부여 중 오류가 발생 했습니다.")
      }
    }
  });

  const onSubmit = useCallback((data: ScoreFormType) => {
    mutate(data);
  }, [mutate]);

  const handleFormSubmit = useCallback<React.FormEventHandler>((e) => {
    void handleSubmit(onSubmit)(e);
  }, [handleSubmit, onSubmit]);

  return (
    <div className="flex flex-col items-center justify-center">
      <Header />
      <form
        className="w-full max-w-[37.5rem] flex px-4 flex-col justify-between h-[90vh]"
        onSubmit={handleFormSubmit}
      >
        <div className="flex flex-col sm:gap-[2rem] gap-[1.5rem]">
          <h1 className="sm:text-titleMedium text-title4s text-tropicalblue-700 mt-[2.38rem]">
            점수 추가
          </h1>
          <InputContainer error={errors.activity} htmlFor="activity" label="봉사활동">
            <Input
              control={control}
              name="activity"
              rules={{
                max: 40,
                min: 0
              }}
              type="number"
            />
          </InputContainer>
          <div className="grid grid-cols-2 gap-4">
            <InputContainer error={errors.oneSemester} htmlFor="oneSemester" label="1학기 봉사 시간">
              <Input
                control={control}
                name="oneSemester"
                rules={{
                  max: 1,
                  min: 0
                }}
                type="number"
              />
            </InputContainer>
            <InputContainer error={errors.twoSemester} htmlFor="twoSemester" label="2학기 봉사 시간">
              <Input
                control={control}
                name="twoSemester"
                rules={{
                  max: 1,
                  min: 0
                }}
                type="number"
              />
            </InputContainer>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <InputContainer error={errors.inAward} htmlFor="inAward" label="교내인성영역관련수상">
              <Input
                control={control}
                name="inAward"
                rules={{
                  max: 4,
                  min: 0
                }}
                type="number"
              />
            </InputContainer>
            <InputContainer error={errors.outAward} htmlFor="outAward" label="교외인성영역관련수상">
              <Input
                control={control}
                name="outAward"
                rules={{
                  max: 4,
                  min: 0
                }}
                type="number"
              />
            </InputContainer>
          </div>
          <InputContainer error={errors.newrrow} htmlFor="newrrow" label="뉴로우 참여 횟수">
            <Input
              control={control}
              name="newrrow"
              rules={{
                max: 5,
                min: 0
              }}
              type="number"
            />
          </InputContainer>
          <Controller
            control={control}
            name="checkbox"
            render={renderCheckbox}
          />
        </div>
        <div className="flex flex-col mt-4 mb-[2rem] gap-[0.69rem]">
          <Button label="뒤로가기" variant="skyblue" onClick={handleBack} />
          <Button
            label="점수 주기 완료"
            state={isPending || !isValid ? "disabled" : "default"}
            type="submit"
            variant="blue"
          />
        </div>
      </form>
    </div>
  );
};

export default ScoreForm;
