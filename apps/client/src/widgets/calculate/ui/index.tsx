"use client";

import { Button } from "@repo/ui/button";
import { variantStyles } from "../../../../../../packages/ui/src/consts/button";
import Dropdown from "../../../shared/ui/dropdown";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { Plus } from "../../../shared/asset/svg/plus";
import { Minus } from "../../../shared/asset/svg/minus";
import { majorCategoryOptions } from "../../major/model/category";
import { CharacterCategory } from "../../character/model/category";

export const Calculate = () => {
  const Buttons = ["독서", "인성", "전공", "외국어"];
  const [fileCount, setFileCount] = useState<number>(0);
  const [page, setPage] = useState<string>("독서");
  const {
    register,
    setValue,
    handleSubmit,
    setError,
    control,
    formState: { errors },
  } = useForm();
  return (
    <div className="flex flex-col gap-[1.5rem] w-full">
      <div className="flex gap-[1.57rem] w-full">
        {Buttons.map((item, index) => {
          return (
            <Button
              isActive
              variant={variantStyles["skyblue"]}
              label={item}
              key={index}
              onClick={() => setPage(item)}
              width="!w-[8.125rem]"
            />
          );
        })}
      </div>
      <div
        className={
          page === "전공" || page === "인성"
            ? "flex flex-col gap-[1.5rem]"
            : "hidden"
        }
      >
        <Controller
          name="category1"
          control={control}
          rules={{
            required: "카테고리를 선택해주세요.",
          }}
          render={({ field }) => (
            <Dropdown
              label="카테고리"
              options={majorCategoryOptions}
              {...field}
            />
          )}
        />
        <Controller
          name="category2"
          control={control}
          rules={{
            required: "카테고리를 선택해주세요.",
          }}
          render={({ field }) => (
            <Dropdown label="카테고리" options={CharacterCategory} {...field} />
          )}
        />

        <div className="flex w-full gap-[1.25rem]">
          <Button
            isActive={fileCount === 0 ? false : true}
            variant={variantStyles["skyblue"]}
            label={
              <Minus className="text-[#5E97FC] group-hover:text-[#DFEAFE]" />
            }
            width="basis-1/6"
            onClick={() => {
              if (fileCount > 0) {
                setFileCount(fileCount - 1);
              }
            }}
          />
          <div className="w-basis-4/6 w-full bg-tropicalblue-100 text-titleSmall text-tropicalblue-700 flex justify-center items-center rounded-[0.625rem] px-[1.5rem] py-[0.97rem]">
            {fileCount}
          </div>
          <Button
            isActive
            variant={variantStyles["skyblue"]}
            className="group"
            label={
              <Plus className="text-[#5E97FC] group-hover:text-[#DFEAFE]" />
            }
            width="basis-1/6"
            onClick={() => setFileCount(fileCount + 1)}
          />
        </div>
      </div>
      <div
        className={page === "독서" || page === "외국어" ? "block" : "hidden"}
      >
        <div className="flex w-full gap-[1.25rem]">
          <Button
            isActive={fileCount === 0 ? false : true}
            variant={variantStyles["skyblue"]}
            label={
              <Minus className="text-[#5E97FC] group-hover:text-[#DFEAFE]" />
            }
            width="basis-1/6"
            onClick={() => {
              if (fileCount > 0) {
                setFileCount(fileCount - 1);
              }
            }}
          />
          <p className="w-basis-4/6 w-full bg-tropicalblue-100 text-titleSmall text-tropicalblue-700 flex justify-center items-center rounded-[0.625rem] px-[1.5rem] py-[0.97rem]">
            {fileCount}
          </p>
          <Button
            isActive
            variant={variantStyles["skyblue"]}
            label={
              <Plus className="text-[#5E97FC] group-hover:text-[#DFEAFE]" />
            }
            width="basis-1/6"
            onClick={() => setFileCount(fileCount + 1)}
          />
        </div>
      </div>
      <div className="flex gap-[1.25rem]  w-full">
        <Button
          isActive
          variant={variantStyles["skyblue"]}
          label={
            <Minus className="text-[#5E97FC] group-hover:text-[#DFEAFE]" />
          }
          width="basis-1/6"
        />
        <p className="basis-5/6 bg-tropicalblue-100 text-titleMedium text-tropicalblue-700 flex justify-center items-center rounded-[0.625rem] py-[2.25rem] px-[1.5rem]">
          150점
        </p>
      </div>
    </div>
  );
};
