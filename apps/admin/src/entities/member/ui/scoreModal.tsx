"use client";

import { Button } from "@repo/shared/button";
import Card from "@repo/shared/card";
import List from "@repo/shared/list";
import { useGetScore } from "../model/useGetScore";
import { getCategoryName } from "@repo/utils/handleCategory";

interface ScoreModalProps {
  close: () => void;
  show: boolean;
  id: string;
}

export default function ScoreModal({ show, close, id }: ScoreModalProps) {
  const { data } = useGetScore(id as string);
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-10 bg-[rgba(17,17,17,0.2)] flex items-center justify-center">
      <div className="gap-6 flex flex-col bg-white z-20 rounded-[1.25rem] px-[2.45rem] py-[2.25rem] max-sm:w-[20.5rem]">
        <h3 className="text-tropicalblue-700 text-titleSmall">부분점수</h3>
        <List className="p-0">
          {data &&
            data?.scores.map((v) => {
              return (
                <Card
                  key={v.categoryName}
                  front={
                    getCategoryName(v.categoryName).replace(/^[^-]*-/, "")
                      .length > 20
                      ? getCategoryName(v.categoryName)
                          .replace(/^[^-]*-/, "")
                          .slice(0, 20) + "..."
                      : getCategoryName(v.categoryName).replace(/^[^-]*-/, "")
                  }
                  id={v.categoryName}
                  back={v.value}
                />
              );
            })}
        </List>
        <Button variant="skyblue" onClick={close} label="뒤로가기" />
      </div>
    </div>
  );
}
