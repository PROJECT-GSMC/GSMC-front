"use client";

import List from "@repo/ui/list";
import { ShowInformation } from "../src/entities/main/ui/showInformation";
import Header from "../src/shared/ui/header";
import { useEffect, useState } from "react";
import { getCertification } from "../src/entities/main/api/getCertification";
import { Certification } from "../src/entities/main/model/certification";
import Card from "@repo/ui/card";
import ShowLogin from "../src/entities/main/ui/showLogin";
import { Button } from "@repo/ui/button";
import MainDropdown from "../src/entities/main/ui/dropdown";

export default function page() {
  const [certification, setCertification] = useState<Certification[]>();
  const [hoverTab, setHoverTab] = useState<string | null>(null);

  useEffect(() => {
    const Fetch = async () => {
      const res = await getCertification();
      setCertification(res);
    };
    Fetch();
  }, []);

  const book_dropdown = [
    {
      title: "독서영역 작성하러가기",
      url: "book/write"
    },
    {
      title: "독서로 단계 입력",
      url: "book/bookroad"
    }
  ]

  const human_dropdown = [
    {
      title: "인성영역 작성하러가기",
      url: "humanity/write"
    },
    {
      title: "인성 자격증 입력하기",
      url: "humanity/certificates"
    }
  ]

  const major_dropdown = [
    {
      title: "전공 자격증 입력하기",
      url: "major/certificate"
    },
    {
      title: "TOPCIT 점수 입력하기",
      url: "marjor/topcit"
    }
  ]

  return (
    <div className="flex flex-col items-center w-full h-screen">
      <Header />
      <div className="w-full max-w-[37.5rem] flex flex-col">
        {localStorage.getItem("accessToken") ? (
          <ShowInformation name="모태환" score={2300} />
        ) : (
          <ShowLogin />
        )}
        <div className="flex items-center gap-10">
          <div
            className="relative w-full"
            onMouseEnter={() => setHoverTab("독서")}
            onMouseLeave={() => setHoverTab(null)}
          >
            <Button
              label="독서"
              variant="skyblue"
              onClick={() => console.log()}
            />
            {hoverTab === "독서" && <MainDropdown list={book_dropdown} />}
          </div>
          <div
            className="relative w-full"
            onMouseEnter={() => setHoverTab("인성")}
            onMouseLeave={() => setHoverTab(null)}
          >
            <Button
              label="인성"
              variant="skyblue"
              onClick={() => console.log()}
            />
            {hoverTab === "인성" && <MainDropdown list={human_dropdown} />}
          </div>
          <div
            className="relative w-full"
            onMouseEnter={() => setHoverTab("전공")}
            onMouseLeave={() => setHoverTab(null)}
          >
            <Button
              label="전공"
              variant="skyblue"
              onClick={() => console.log()}
            />
            {hoverTab === "전공" && <MainDropdown list={major_dropdown} />}
          </div>
          <Button label="외국어" variant="skyblue" onClick={() => console.log()} />
        </div>
        <div className="flex flex-col mt-9">
          <List title="자격증">
            {certification?.map((v, i) => {
              return <Card key={i} front={v.name} />;
            })}
          </List>
        </div>
      </div>
    </div>
  );
}
