"use client";

import { Button } from "@repo/shared/button";
import Card from "@repo/shared/card";
import List from "@repo/shared/list";
import { getCategoryName } from "@repo/utils/handleCategory";

import { useGetScore } from "../model/useGetScore";

interface ScoreModalProps {
  close: () => void;
  show: boolean;
  id: string;
}

export default function ScoreModal({ show, close, id }: ScoreModalProps) {
  const { data } = useGetScore(id);
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-10 bg-[rgba(17,17,17,0.2)] flex items-center justify-center">
      <div className="flex flex-col z-20 gap-6 bg-white rounded-[1.25rem] px-[2.45rem] py-[2.25rem] max-sm:w-[20.5rem]">
        <h3 className="text-tropicalblue-700 text-titleSmall">
          부분점수
        </h3>
        <List className="w-[21.875rem] h-[46.875rem] p-0">
          {data?.scores.map((v) => (
            <Card
              back={v.convertedValue}
              front={getCategoryName(v.categoryName).replace(/^[^-]*-/, "")}
              id={v.categoryName}
              key={v.categoryName}
            />
          ))}
        </List>
        <Button label="뒤로가기" variant="skyblue" onClick={close} />
      </div>
    </div>
  );
}
