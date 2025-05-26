"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import List from "@repo/shared/list";
import Card from "@repo/shared/card";
import { Button } from "@repo/shared/button";

import { ShowInformation } from "@entities/main/ui/showInformation";
import { getCertification } from "@entities/main/api/getCertification";
import ShowSignin from "@/entities/main/ui/showSignin";
import MainDropdown from "@entities/main/ui/dropdown";

import Header from "@shared/ui/header";
import Modal from "@widgets/main/ui/modal";
import { getCookie } from "@repo/utils/getCookie";
import { useGetCurrentMember } from "@/shared/model/useGetCurrentMember";

const MainView = () => {
  const [hoverTab, setHoverTab] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [show, setShow] = useState(false);
  const [type, setType] = useState<
    "CERTIFICATE" | "TOPCIT" | "READ_A_THON" | "HUMANITY"
  >("CERTIFICATE");

  useEffect(() => {
    const token = getCookie("accessToken");
    setAccessToken(token);
  }, []);

  const { data: currentUser, isLoading: isCurrentUserLoading } =
    useGetCurrentMember();

  const { data: certification, isLoading: isCertificationLoading } = useQuery({
    queryKey: ["certifications"],
    queryFn: getCertification,
    enabled: !!accessToken,
  });

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <Header />
      {!(isCurrentUserLoading && isCertificationLoading) ? (
        <div className="w-full max-w-[37.5rem] flex flex-col">
          {accessToken ? (
            <ShowInformation
              name={currentUser?.data?.name ?? ""}
              score={currentUser?.data?.totalScore ?? 0}
            />
          ) : (
            <ShowSignin />
          )}
          <div className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-6 lg:gap-10 mx-4">
            <div
              className="relative w-full"
              onMouseEnter={() => setHoverTab("독서")}
              onMouseLeave={() => setHoverTab(null)}
            >
              <Button label="독서" variant="skyblue" />
              <MainDropdown isOpen={!!accessToken && hoverTab === "독서"}>
                <Link
                  className="w-full flex justify-between cursor-pointer text-body5 md:text-body3s"
                  href="/book"
                >
                  <p>독서영역 작성</p>
                  <p>{">"}</p>
                </Link>
                <div
                  onClick={async () => {
                    await setType("READ_A_THON");
                    setShow(true);
                  }}
                  className="w-full flex justify-between cursor-pointer text-body5 md:text-body3s"
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
              <Button label="인성" variant="skyblue" />
              <MainDropdown isOpen={!!accessToken && hoverTab === "인성"}>
                <Link
                  className="w-full flex justify-between cursor-pointer text-body5 md:text-body3s"
                  href="/humanity"
                >
                  <p>인성영역 작성</p>
                  <p>{">"}</p>
                </Link>
                <div
                  className="w-full flex justify-between cursor-pointer text-body5 md:text-body3s"
                  onClick={async () => {
                    await setType("HUMANITY");
                    setShow(true);
                  }}
                >
                  <p>인성영역 자격증</p>
                  <p>{">"}</p>
                </div>
              </MainDropdown>
            </div>
            <div
              className="relative w-full"
              onMouseEnter={() => setHoverTab("전공")}
              onMouseLeave={() => setHoverTab(null)}
            >
              <Button label="전공" variant="skyblue" />
              <MainDropdown isOpen={!!accessToken && hoverTab === "전공"}>
                <Link
                  className="w-full flex justify-between cursor-pointer text-body5 md:text-body3s"
                  href="/major"
                >
                  <p>전공영역 작성</p>
                  <p>{">"}</p>
                </Link>
                <div
                  className="w-full flex justify-between cursor-pointer text-body5 md:text-body3s"
                  onClick={async () => {
                    await setType("TOPCIT");
                    setShow(true);
                  }}
                >
                  <p>TOPCIT 점수</p>
                  <p>{">"}</p>
                </div>
                <div
                  className="w-full flex justify-between cursor-pointer text-body5 md:text-body3s"
                  onClick={async () => {
                    await setType("CERTIFICATE");
                    setShow(true);
                  }}
                >
                  <p>전공 자격증</p>
                  <p>{">"}</p>
                </div>
              </MainDropdown>
            </div>
            <Link href="/foreign">
              <Button label="외국어" variant="skyblue" />
            </Link>
          </div>
          <div className="flex flex-col mt-9 mx-4">
            <List title="자격증">
              {accessToken ? (
                certification?.data?.certificates && certification?.data?.certificates.length > 0 ? (
                  certification?.data?.certificates?.map((v, i) => (
                    <Card
                      key={i}
                      id={v.id}
                      front={v.name}
                    />
                  ))
                ) : (
                  <div className="text-center text-body3 my-[13rem] ">
                    등록된 자격증이 존재하지 않습니다.
                  </div>
                )
              ) : (
                <div className="text-center text-body3 my-[13rem]">
                  로그인 후 확인가능합니다.
                </div>
              )}
            </List>
          </div>
        </div>
      ) : (
        <p className="text-center m-8">로딩중...</p>
      )}
      {show && <Modal type={type} onClose={() => setShow(false)} />}
    </div>
  );
};

export default MainView;
