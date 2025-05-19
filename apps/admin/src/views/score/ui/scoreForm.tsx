"use client";

import { useParams } from "next/navigation";
import { Controller, useForm, useWatch } from "react-hook-form";

import { Button } from "@repo/shared/button";
import { Input } from "@repo/shared/input";
import { InputContainer } from "@repo/shared/inputContainer";

import { Checkbox } from "../../../entities/score/ui/checkbox";
import Header from "../../../shared/ui/header";
import { ScoreFormType } from "../model/score";
import { featScore } from "../api/featScore";
import { toast } from "sonner";

const ScoreForm = () => {
  const { id } = useParams();

  const { handleSubmit, control } = useForm<ScoreFormType>({
    mode: "onChange",
  });

  const { oneSemester, twoSemester, newrrow, checkbox } =
    useWatch({ control }) || {};

  const isFormValid = !!oneSemester || !!twoSemester || !!newrrow || checkbox;

  const onSubmit = async (data: ScoreFormType) => {
    if (data.oneSemester) {
      const res = await featScore(
        decodeURIComponent(String(id)),
        "HUMANITIES-SERVICE-CLUB_SEMESTER_1",
        data.oneSemester
      );
      if (res.status === 204) toast.success("1학기 봉사 시간 점수 추가 완료");
      else toast.error("1학기 봉사 시간 점수 추가 실패");
    }
    if (data.twoSemester) {
      const res = await featScore(
        decodeURIComponent(String(id)),
        "HUMANITIES-SERVICE-CLUB_SEMESTER_2",
        data.twoSemester
      );
      if (res.status === 204) toast.success("2학기 봉사 시간 점수 추가 완료");
      else toast.error("2학기 봉사 시간 점수 추가 실패");
    }
    if (data.newrrow) {
      const res = await featScore(
        decodeURIComponent(String(id)),
        "HUMANITIES-ACTIVITIES-NEWRROW_S",
        data.newrrow
      );
      if (res.status === 204) toast.success("뉴로우 참여 횟수 점수 추가 완료");
      else toast.error("뉴로우 참여 횟수 점수 추가 실패");
    }
    if (data.checkbox !== undefined) {
      const res = await featScore(
        decodeURIComponent(String(id)),
        "FOREIGN_LANG-ATTENDANCE-TOEIC_ACADEMY_STATUS",
        data.checkbox ? 1 : 0
      );
      if (res.status === 204) toast.success("TOEIC 참여 여부 점수 추가 완료");
      else toast.error("TOEIC 여부 점수 추가 실패");
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
            <Input control={control} name="newrrow" />
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
            type="submit"
            state={isFormValid ? "default" : "disabled"}
            variant="blue"
            label="점수 주기 완료"
          />
        </div>
      </form>
    </div>
  );
};

export default ScoreForm;
