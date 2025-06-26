"use client";

import { Button } from "@repo/shared/button";
import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { Minus } from "@shared/asset/svg/minus";
import { Plus } from "@shared/asset/svg/plus";
import Dropdown, { type Option } from "@shared/ui/dropdown";

import {
  foreignCategoryOptions,
  humanCategoryOptions,
  majorCategoryOptions,
} from "../model/category";

export const Calculate = () => {
  const Buttons = ["독서", "인성", "전공", "외국어"];
  const [page, setPage] = useState<string>("독서");

  const [bookCount, setBookCount] = useState(0);
  const [totalScore, setTotalScore] = useState<number>(0);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, Option | null>
  >({
    인성: null,
    전공: null,
    외국어: null,
  });

  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>(
    {},
  );

  const [idCounts, setIdCounts] = useState<Record<number, number>>({});

  const { control } = useForm();

  const handlePlusWithScore = useCallback(
    (page: string) => () => {
      const selected = selectedOptions[page];
      if (selected?.id == null) return;

      const selectedId = selected.id;
      const currentSendCount = categoryCounts[selected.send] ?? 0;
      const currentIdCount = idCounts[selectedId] ?? 0;
      const max =
        Number.parseInt(selected.max_number?.replace(/[^0-9]/g, "") ?? "") || 1;
      const score = Number.parseInt(selected.score?.match(/\d+/)?.[0] ?? "0");
      if (currentIdCount < max) {
        setCategoryCounts((prev) => ({
          ...prev,
          [selected.send]: currentSendCount + 1,
        }));
        setIdCounts((prev) => ({
          ...prev,
          [selectedId]: currentIdCount + 1,
        }));
        setTotalScore((prev) => prev + score);
      }
    },
    [categoryCounts, idCounts, selectedOptions],
  );

  const handleMinusWithScore = useCallback(
    (page: string) => () => {
      const selected = selectedOptions[page];
      if (selected?.id == null) return;

      const selectedId = selected.id;
      const score = Number.parseInt(selected.score?.match(/\d+/)?.[0] ?? "0");
      const currentSendCount = categoryCounts[selected.send] ?? 0;
      const currentIdCount = idCounts[selected.id] ?? 0;
      if (currentSendCount > 0 && currentIdCount > 0) {
        setCategoryCounts((prev) => ({
          ...prev,
          [selected.send]: currentSendCount - 1,
        }));
        setIdCounts((prev) => ({
          ...prev,
          [selectedId]: currentIdCount - 1,
        }));
        setTotalScore((prev) => prev - score);
      }
    },
    [categoryCounts, idCounts, selectedOptions],
  );

  const handleCalcPage = useCallback(
    (item: string) => () => {
      setPage(item);
    },
    [],
  );

  const handleBookMinus = useCallback(() => {
    if (bookCount > 0) {
      setBookCount((prev) => prev - 1);
      setTotalScore((prev) => prev - 10);
    }
  }, [bookCount]);

  const handleBookPlus = useCallback(() => {
    if (bookCount < 10) {
      setBookCount((prev) => prev + 1);
      setTotalScore((prev) => prev + 10);
    }
  }, [bookCount]);

  return (
    <div className="flex flex-col gap-[1.5rem] w-full h-[30rem]">
      <div className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-6 lg:gap-10 mx-4">
        {Buttons.map((item) => (
          <Button
            key={item}
            label={item}
            state="default"
            variant={page === item ? "blue" : "skyblue_hover"}
            onClick={handleCalcPage(item)}
          />
        ))}
      </div>
      {page === "독서" && (
        <div className="flex flex-col gap-[1.5rem] mx-4">
          <div className="flex w-full gap-[1.25rem]">
            <Button
              className="group basis-1/6"
              label={
                <Minus
                  className={
                    bookCount === 0
                      ? `text-[#828387] group-hover:text-[#828387]`
                      : `text-tropicalblue-500 group-hover:text-tropicalblue-100`
                  }
                />
              }
              state={bookCount === 0 ? "disabled" : "default"}
              variant="skyblue_hover"
              onClick={handleBookMinus}
            />
            <p className="basis-4/6 bg-tropicalblue-100 text-titleSmall text-tropicalblue-700 flex justify-center items-center rounded-[0.625rem] px-[1.5rem] py-[0.97rem]">
              {bookCount}
            </p>
            <Button
              className="group basis-1/6"
              label={
                <Plus
                  className={
                    bookCount === 10
                      ? `text-[#828387] group-hover:text-[#828387]`
                      : `text-tropicalblue-500 group-hover:text-tropicalblue-100`
                  }
                />
              }
              state={bookCount === 10 ? "disabled" : "default"}
              variant="skyblue_hover"
              onClick={handleBookPlus}
            />
          </div>
        </div>
      )}
      {["인성", "전공", "외국어"].includes(page) && (
        <div className="flex flex-col gap-[1.5rem] mx-4">
          <Controller
            control={control}
            name={`category-${page}`}
            // eslint-disable-next-line react/jsx-no-bind
            render={({ field }) => (
              <Dropdown
                label="카테고리"
                options={
                  page === "인성"
                    ? humanCategoryOptions
                    : (page === "전공"
                      ? majorCategoryOptions
                      : foreignCategoryOptions)
                }
                value={selectedOptions[page] ?? undefined}
                // eslint-disable-next-line react/jsx-no-bind
                onChange={(option) => {
                  setSelectedOptions((prev) => ({ ...prev, [page]: option }));
                  field.onChange(option);
                }}
              />
            )}
            rules={{ required: "카테고리를 선택해주세요." }}
          />
          <div className="flex w-full gap-[1.25rem]">
            <Button
              className="group basis-1/6"
              label={
                <Minus
                  className={
                    !selectedOptions[page] ||
                      (categoryCounts[selectedOptions[page].send] ?? 0) === 0
                      ? "text-[#828387] group-hover:text-[#828387]"
                      : "text-tropicalblue-500 group-hover:text-tropicalblue-100"
                  }
                />
              }
              state={
                !selectedOptions[page] ||
                  (categoryCounts[selectedOptions[page].send] ?? 0) === 0
                  ? "disabled"
                  : "default"
              }
              variant="skyblue_hover"
              onClick={handleMinusWithScore(page)}
            />
            <p className="basis-4/6 bg-tropicalblue-100 text-titleSmall text-tropicalblue-700 flex justify-center items-center rounded-[0.625rem] px-[1.5rem] py-[0.97rem]">
              {selectedOptions[page]
                ? (categoryCounts[selectedOptions[page].send] ?? 0)
                : 0}
            </p>
            <Button
              className="group basis-1/6"
              label={
                <Plus className="text-tropicalblue-500 group-hover:text-tropicalblue-100" />
              }
              state="default"
              variant="skyblue_hover"
              onClick={handlePlusWithScore(page)}
            />
          </div>
        </div>
      )}
      <div className="flex gap-[1.25rem] w-full mt-auto">
        <p className="basis-full bg-tropicalblue-100 text-titleMedium text-tropicalblue-700 flex justify-center items-center rounded-[0.625rem] py-[2.25rem] px-[1.5rem] mx-4">
          {totalScore}점
        </p>
      </div>
    </div>
  );
};
