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
import Link from "next/link";
import Modal from "../src/widgets/main/ui/modal";

export default function Page() {
  const [certification, setCertification] = useState<Certification[]>();
  const [hoverTab, setHoverTab] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [show, setShow] = useState(false);
  const [type, setType] = useState<"CERTIFICATE" | "TOPCIT" | "READ_A_THON">(
    "CERTIFICATE"
  );

  useEffect(() => {
    const Fetch = async () => {
      const res = await getCertification();
      setCertification(res);
    };
    Fetch();

    const token = localStorage.getItem("accessToken");
    setAccessToken(token);
  }, []);

  return (
    <div className="flex flex-col items-center w-full h-screen">
      <Header />
      <div className="w-full max-w-[37.5rem] flex flex-col">
        {accessToken ? (
          <ShowInformation name="모태환" score={2300} />
        ) : (
          <ShowLogin />
        )}
        <div className="flex items-center gap-2 sm:gap-4 md:gap-6 lg:gap-10 mx-4">
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
            <MainDropdown isOpen={hoverTab === "독서"}>
              <Link
                className="w-full flex justify-between cursor-pointer text-body3s"
                href="/book"
              >
                <p>독서 작성하러가기</p>
                <p>{">"}</p>
              </Link>
              <div
                onClick={async () => {
                  await setType("READ_A_THON");
                  setShow(true);
                }}
                className="w-full flex justify-between cursor-pointer text-body3s"
              >
                <p>독서로 단계 입력</p>
                <p>{">"}</p>
              </div>
            </MainDropdown>
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

            <MainDropdown isOpen={hoverTab === "인성"}>
              <Link
                className="w-full flex justify-between cursor-pointer text-body3s"
                href="/character"
              >
                <p>인성 작성하러가기</p>
                <p>{">"}</p>
              </Link>
              <div
                className="w-full flex justify-between cursor-pointer text-body3s"
                onClick={async () => {
                  await setType("CERTIFICATE");
                  setShow(true);
                }}
              >
                <p>한국사, 한자 자격증</p>
                <p>{">"}</p>
              </div>
            </MainDropdown>
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

            <MainDropdown isOpen={hoverTab === "전공"}>
              <Link
                className="w-full flex justify-between cursor-pointer text-body3s"
                href="/major"
              >
                <p>전공 작성하러가기</p>
                <p>{">"}</p>
              </Link>
              <div
                className="w-full flex justify-between cursor-pointer text-body3s"
                onClick={async () => {
                  await setType("TOPCIT");
                  setShow(true);
                }}
              >
                <p>TOPCIT 점수</p>
                <p>{">"}</p>
              </div>
              <div
                className="w-full flex justify-between cursor-pointer text-body3s"
                onClick={async () => {
                  await setType("TOPCIT");
                  setShow(true);
                }}
              >
                <p>전공 자격증 추가하기</p>
                <p>{">"}</p>
              </div>
            </MainDropdown>
          </div>
          <Button
            label="외국어"
            variant="skyblue"
            onClick={() => console.log()}
          />
        </div>
        <div className="flex flex-col mt-9 mx-4">
          <List title="자격증">
            {certification ? (
              certification?.map((v, i) => {
                return <Card key={i} front={v.name} />;
              })
            ) : (
              <div className="text-center text-body3 mt-[7.5rem]">
                등록된 자격증이 존재하지 않습니다
              </div>
            )}
          </List>
        </div>
      </div>
      {show && <Modal type={type} onClose={() => setShow(false)} />}
    </div>
  );
}
