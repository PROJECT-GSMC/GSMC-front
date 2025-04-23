"use client";

import { Button } from "@repo/ui/button";
import Dropdown from "../../../shared/ui/dropdown";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { Plus } from "../../../shared/asset/svg/plus";
import { Minus } from "../../../shared/asset/svg/minus";
import {
  foreignCategoryOptions,
  humanCategoryOptions,
  majorCategoryOptions,
} from "../model/category";

export const Calculate = () => {
  const Buttons = ["독서", "인성", "전공", "외국어"];
  const [fileCount, setFileCount] = useState<number>(0);
  const [page, setPage] = useState<string>("독서");
  const { control } = useForm();

  return (
    <div className="flex flex-col gap-[1.5rem] w-full h-[30rem]">
      {/* 탭 버튼 */}
      <div className="flex gap-[1.57rem] w-full">
        {Buttons.map((item, index) => (
          <Button
            state={page === item ? "default" : "default"} // 탭은 모두 default로, 필요시 "active"로 변경
            variant={page === item ? "blue" : "skyblue_hover"}
            label={item}
            key={index}
            onClick={() => setPage(item)}
            className="!w-[8.125rem]"
          />
        ))}
      </div>

      {/* 독서 */}
      <div
        className={page === "독서" ? "flex flex-col gap-[1.5rem]" : "hidden"}
      >
        <div className="flex w-full gap-[1.25rem]">
          <Button
            state={fileCount === 0 ? "disabled" : "default"}
            variant="skyblue_hover"
            label={
              <Minus
                className={`${fileCount === 0 ? "group-hover:text-[#828387] text-[#828387]" : "group-hover:text-[#DFEAFE] text-[#5E97FC]"}`}
              />
            }
            className="group basis-1/6"
            onClick={() => {
              if (fileCount > 0) setFileCount(fileCount - 1);
            }}
          />
          <p className="w-basis-4/6 w-full bg-tropicalblue-100 text-titleSmall text-tropicalblue-700 flex justify-center items-center rounded-[0.625rem] px-[1.5rem] py-[0.97rem]">
            {fileCount}
          </p>
          <Button
            state="default"
            variant="skyblue_hover"
            label={
              <Plus className="text-[#5E97FC] group-hover:text-[#DFEAFE]" />
            }
            className="group basis-1/6"
            onClick={() => setFileCount(fileCount + 1)}
          />
        </div>
      </div>

      {/* 인성 */}
      <div
        className={page === "인성" ? "flex flex-col gap-[1.5rem]" : "hidden"}
      >
        <Controller
          name="category1"
          control={control}
          rules={{ required: "카테고리를 선택해주세요." }}
          render={({ field }) => (
            <Dropdown
              label="카테고리"
              options={humanCategoryOptions}
              {...field}
            />
          )}
        />
        <div className="flex w-full gap-[1.25rem]">
          <Button
            state={fileCount === 0 ? "disabled" : "default"}
            variant="skyblue_hover"
            label={
              <Minus
                className={`${fileCount === 0 ? "group-hover:text-[#828387] text-[#828387]" : "group-hover:text-[#DFEAFE] text-[#5E97FC]"}`}
              />
            }
            className="group basis-1/6"
            onClick={() => {
              if (fileCount > 0) setFileCount(fileCount - 1);
            }}
          />
          <p className="w-basis-4/6 w-full bg-tropicalblue-100 text-titleSmall text-tropicalblue-700 flex justify-center items-center rounded-[0.625rem] px-[1.5rem] py-[0.97rem]">
            {fileCount}
          </p>
          <Button
            state="default"
            variant="skyblue_hover"
            label={
              <Plus className="text-[#5E97FC] group-hover:text-[#DFEAFE]" />
            }
            className="group basis-1/6"
            onClick={() => setFileCount(fileCount + 1)}
          />
        </div>
      </div>

      {/* 전공 */}
      <div
        className={`${page === "전공" ? "block" : "hidden"} flex flex-col gap-[1.5rem]`}
      >
        <Controller
          name="category2"
          control={control}
          rules={{ required: "카테고리를 선택해주세요." }}
          render={({ field }) => (
            <Dropdown
              label="카테고리"
              options={majorCategoryOptions}
              {...field}
            />
          )}
        />
        <div className="flex w-full gap-[1.25rem]">
          <Button
            state={fileCount === 0 ? "disabled" : "default"}
            variant="skyblue_hover"
            label={
              <Minus
                className={`${fileCount === 0 ? "group-hover:text-[#828387] text-[#828387]" : "group-hover:text-[#DFEAFE] text-[#5E97FC]"}`}
              />
            }
            className="group basis-1/6"
            onClick={() => {
              if (fileCount > 0) setFileCount(fileCount - 1);
            }}
          />
          <p className="w-basis-4/6 w-full bg-tropicalblue-100 text-titleSmall text-tropicalblue-700 flex justify-center items-center rounded-[0.625rem] px-[1.5rem] py-[0.97rem]">
            {fileCount}
          </p>
          <Button
            state="default"
            variant="skyblue_hover"
            label={
              <Plus className="text-[#5E97FC] group-hover:text-[#DFEAFE]" />
            }
            className="group basis-1/6"
            onClick={() => setFileCount(fileCount + 1)}
          />
        </div>
      </div>

      {/* 외국어 */}
      <div
        className={`${page === "외국어" ? "block" : "hidden"} flex flex-col gap-[1.5rem]`}
      >
        <Controller
          name="category3"
          control={control}
          rules={{ required: "카테고리를 선택해주세요." }}
          render={({ field }) => (
            <Dropdown
              label="카테고리"
              options={foreignCategoryOptions}
              {...field}
            />
          )}
        />
        <div className="flex w-full gap-[1.25rem]">
          <Button
            state={fileCount === 0 ? "disabled" : "default"}
            variant="skyblue_hover"
            label={
              <Minus
                className={`${fileCount === 0 ? "group-hover:text-[#828387] text-[#828387]" : "group-hover:text-[#DFEAFE] text-[#5E97FC]"}`}
              />
            }
            className="group basis-1/6"
            onClick={() => {
              if (fileCount > 0) setFileCount(fileCount - 1);
            }}
          />
          <p className="w-basis-4/6 w-full bg-tropicalblue-100 text-titleSmall text-tropicalblue-700 flex justify-center items-center rounded-[0.625rem] px-[1.5rem] py-[0.97rem]">
            {fileCount}
          </p>
          <Button
            state="default"
            variant="skyblue_hover"
            label={
              <Plus className="text-[#5E97FC] group-hover:text-[#DFEAFE]" />
            }
            className="group basis-1/6"
            onClick={() => setFileCount(fileCount + 1)}
          />
        </div>
      </div>

      {/* 점수 표시 */}
      <div className="flex gap-[1.25rem] w-full mt-auto">
        <Button
          state="default"
          variant="skyblue_hover"
          label={
            <Minus className="text-[#5E97FC] group-hover:text-[#DFEAFE]" />
          }
          className="group basis-1/6"
        />
        <p className="basis-5/6 bg-tropicalblue-100 text-titleMedium text-tropicalblue-700 flex justify-center items-center rounded-[0.625rem] py-[2.25rem] px-[1.5rem]">
          150점
        </p>
      </div>
    </div>
  );
};
