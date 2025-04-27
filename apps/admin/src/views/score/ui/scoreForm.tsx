"use client";

import { useParams } from "next/navigation";
import { Controller, useForm, useWatch } from "react-hook-form";

import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { InputContainer } from "@repo/ui/widgets/inputContainer/index";

import { Checkbox } from "../../../entities/score/ui/checkbox";
import Header from "../../../shared/ui/header";
import { ScoreFormType } from "../model/score";
import { featScore } from "../api/featScore";

export const ScoreForm = () => {
  const P = useParams<{ email: string }>();
  const email = P.email;

  const { handleSubmit, control } = useForm<ScoreFormType>({
    mode: "onChange",
  });

  const { oneSemester, twoSemester, newrow, checkbox } =
    useWatch({ control }) || {};

  const isFormValid = !!oneSemester || !!twoSemester || !!newrow || checkbox;

  const onSubmit = (data: ScoreFormType) => {
    if (data.oneSemester) {
      featScore(email, "HUMANITIES-SERVICE-CLUB_SEMESTER_1", data.oneSemester);
    }
    if (data.twoSemester) {
      featScore(email, "HUMANITIES-SERVICE-CLUB_SEMESTER_2", data.twoSemester);
    }
    if (data.newrow) {
      featScore(email, "HUMANITIES-ACTIVITIES-NEWRROW_S", data.newrow);
    }
    if (data.checkbox !== undefined) {
      featScore(
        email,
        "FOREIGN_LANG-ATTENDANCE-TOEIC_ACADMY_STATUS",
        data.checkbox ? 1 : 0
      );
    }
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <Header />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-[37.5rem] flex px-4 flex-col  justify-between h-[90vh]"
      >
        <div className="flex flex-col sm:gap-[2rem] gap-[1.5rem]">
          <h1 className="sm:text-titleMedium text-title4s text-tropicalblue-700 mt-[2.38rem]">
            점수 추가
          </h1>
          <InputContainer label="1학기 봉사 시간">
            <Input control={control} name="oneSemester" />
          </InputContainer>
          <InputContainer label="2학기 봉사 시간">
            <Input control={control} name="twoSemester" />
          </InputContainer>
          <InputContainer label="뉴로우 참여 횟수">
            <Input control={control} name="newrow" />
          </InputContainer>
          <Controller
            control={control}
            name="checkbox"
            render={({ field }) => <Checkbox {...field} />}
          />
        </div>
        <div className="flex flex-col mt-4 mb-[2rem] gap-[0.69rem]">
          <Button variant="skyblue" label="뒤로가기" />
          <Button
            state={isFormValid ? "default" : "disabled"}
            variant="blue"
            label="점수 주기 완료"
          />
        </div>
      </form>
    </div>
  );
};

