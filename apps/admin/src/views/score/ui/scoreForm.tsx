"use client";

import { Button } from "@repo/shared/button";
import { Input } from "@repo/shared/input";
import { InputContainer } from "@repo/shared/inputContainer";
import { useParams, useRouter } from "next/navigation";
import { useCallback } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

import { featScore } from "../api/featScore";
import type { ScoreFormType } from "../model/score";
import { SCORE_CATEGORIES } from "../model/score_category";

import { Checkbox } from "@/entities/score/ui/checkbox";
import Header from "@/shared/ui/header";

const ScoreForm = () => {
  const { id } = useParams();
  const router = useRouter();

  const { handleSubmit, control } = useForm<ScoreFormType>({
    mode: "onChange",
  });

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const renderCheckbox = useCallback(
    ({ field }: {
      field: { value?: boolean; onChange: (value: boolean | null) => void };
    }) => <Checkbox {...field} />,
    [],
  );

  const { oneSemester, twoSemester, newrrow, checkbox } = useWatch({ control });

  const isFormValid = Boolean(
    (oneSemester !== undefined && oneSemester !== null && oneSemester > 0) ||
    (twoSemester !== undefined && twoSemester !== null && twoSemester > 0) ||
    (newrrow !== undefined && newrrow !== null && newrrow > 0) ||
    checkbox !== undefined,
  );

  const handleScoreSubmit = useCallback(
    async (category: string, score: number, successMessage: string) => {
      try {
        const email = decodeURIComponent(String(id));
        const response = await featScore(email, category, score);

        if (response.status === 204) {
          toast.success(successMessage);
          return true;
        } else {
          toast.error(`${successMessage.replace(" 완료", "")} 실패`);
          return false;
        }
      } catch {
        toast.error("점수 추가 중 오류가 발생했습니다");
        return false;
      }
    },
    [id],
  );

  const onSubmit = useCallback(
    async (data: ScoreFormType) => {
      let success = true;

      if (data.activity !== null && data.activity > 0) {
        success = (await handleScoreSubmit(
          SCORE_CATEGORIES.ACTIVITY,
          data.activity,
          "봉사활동 점수 추가 완료",
        )) && success;
      }

      if (data.oneSemester !== null && data.oneSemester > 0) {
        success = (await handleScoreSubmit(
          SCORE_CATEGORIES.SEMESTER_1,
          data.oneSemester,
          "1학기 봉사 시간 점수 추가 완료",
        )) && success;
      }

      if (data.twoSemester !== null && data.twoSemester > 0) {
        success = (await handleScoreSubmit(
          SCORE_CATEGORIES.SEMESTER_2,
          data.twoSemester,
          "2학기 봉사 시간 점수 추가 완료",
        )) && success;
      }

      if (data.inAward !== null && data.inAward > 0) {
        success = (await handleScoreSubmit(
          SCORE_CATEGORIES.AWARD_IN,
          data.inAward,
          "교내인성영역관련수상 점수 추가 완료",
        )) && success;
      }

      if (data.outAward !== null && data.outAward > 0) {
        success = (await handleScoreSubmit(
          SCORE_CATEGORIES.AWARD_OUT,
          data.outAward,
          "교외인성영역관련수상 점수 추가 완료",
        )) && success;
      }

      if (data.newrrow !== null && data.newrrow > 0) {
        success = (await handleScoreSubmit(
          SCORE_CATEGORIES.NEWRROW,
          data.newrrow,
          "뉴로우 참여 횟수 점수 추가 완료",
        )) && success;
      }

      if (data.checkbox !== undefined) {
        success = (await handleScoreSubmit(
          SCORE_CATEGORIES.TOEIC,
          data.checkbox ? 1 : 0,
          "TOEIC 참여 여부 점수 추가 완료",
        )) && success;
      }

      if (success) {
        router.push("/");
      }
    },
    [handleScoreSubmit, router],
  );

  const handleFormSubmit = useCallback<React.FormEventHandler>(
    (e) => {
      void handleSubmit(onSubmit)(e);
    },
    [handleSubmit, onSubmit],
  );

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
          <InputContainer label="봉사활동">
            <Input
              control={control}
              max={40}
              min={0}
              name="activity"
              type="number"
            />
          </InputContainer>
          <div className="grid grid-cols-2 gap-4">
            <InputContainer label="1학기 봉사 시간">
              <Input
                control={control}
                max={1}
                min={0}
                name="oneSemester"
                type="number"
              />
            </InputContainer>
            <InputContainer label="2학기 봉사 시간">
              <Input
                control={control}
                max={1}
                min={0}
                name="twoSemester"
                type="number"
              />
            </InputContainer>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <InputContainer label="교내인성영역관련수상">
              <Input
                control={control}
                max={4}
                min={0}
                name="inAward"
                type="number"
              />
            </InputContainer>
            <InputContainer label="교외인성영역관련수상">
              <Input
                control={control}
                max={4}
                min={0}
                name="outAward"
                type="number"
              />
            </InputContainer>
          </div>
          <InputContainer label="뉴로우 참여 횟수">
            <Input
              control={control}
              max={5}
              min={0}
              name="newrrow"
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
            state={isFormValid ? "default" : "disabled"}
            type="submit"
            variant="blue"
          />
        </div>
      </form>
    </div>
  );
};

export default ScoreForm;
