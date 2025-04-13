"use client";

import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { Controller, useForm } from "react-hook-form";
import Checkbox from "../../../entities/score/ui/checkbox";
import Header from "../../../shared/ui/header";

const ScoreForm = () => {
  const { control } = useForm();
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Header />
      <div className="flex flex-col gap-[2rem] w-[600px]">
        <h1 className="text-titleMedium text-tropicalblue-700 mt-[2.38rem]">
          점수 추가
        </h1>
        <Controller
          control={control}
          name="oneSemester"
          render={({ field }) => <Input label="1학기 봉사 시간" {...field} />}
        />
        <Controller
          control={control}
          name="twoSemester"
          render={({ field }) => <Input label="2학기 봉사 시간" {...field} />}
        />
        <Controller
          control={control}
          name="newrow"
          render={({ field }) => <Input label="뉴로우 참여 횟수" {...field} />}
        />
        <Controller
          control={control}
          name="checkbox"
          render={({ field }) => <Checkbox {...field} />}
        />

        <div className="flex flex-col gap-[0.69rem]">
          <Button variant="skyblue" label="뒤로가기" isActive />
          <Button variant="blue" label="점수 주기 완료" isActive />
        </div>
      </div>
    </div>
  );
};

export default ScoreForm;
