"use client";

import { Button } from "@repo/shared/button";
import Card from "@repo/shared/card";
import List from "@repo/shared/list";
import { getCookie } from "@repo/utils/getCookie";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect, useState } from "react";

import ShowSignin from "@/entities/main/ui/showSignin";
import { useGetCurrentMember } from "@/shared/model/useGetCurrentMember";
import { getCertification } from "@entities/main/api/getCertification";
import MainDropdown from "@entities/main/ui/dropdown";
import { ShowInformation } from "@entities/main/ui/showInformation";
import Modal from "@widgets/main/ui/modal";

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

  const {
    data: certification,
    isLoading: isCertificationLoading,
    refetch,
  } = useQuery({
    queryKey: ["certifications"],
    queryFn: getCertification,
    enabled: !!accessToken,
  });

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      {(isCurrentUserLoading && isCertificationLoading) ? (
        <p className="text-center m-8">로딩중...</p>
      ) : (
        <div className="w-full max-w-[37.5rem] flex flex-col">
          {accessToken ? (
            <ShowInformation
              name={currentUser?.name ?? ""}
              score={currentUser?.totalScore ?? 0}
            />
          ) : (
            <ShowSignin />
          )}
          <div className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-6 lg:gap-10 mx-4">
            <div
              className="relative w-full"
              onMouseEnter={() => { setHoverTab("독서"); }}
              onMouseLeave={() => { setHoverTab(null); }}
            >
              <Button label="독서" variant="skyblue" />
              <MainDropdown isOpen={!!accessToken && hoverTab === "독서"}>
                <Link
                  className="w-full flex justify-between cursor-pointer text-body5 md:text-body3s"
                  href="/write?type=reading"
                >
                  <p>독서영역 작성</p>
                  <p>{">"}</p>
                </Link>
                <div
                  className="w-full flex justify-between cursor-pointer text-body5 md:text-body3s"
                  onClick={async () => {
                    await setType("READ_A_THON");
                    setShow(true);
                  }}
                >
                  <p>독서로 단계 입력</p>
                  <p>{">"}</p>
                </div>
              </MainDropdown>
            </div>
            <div
              className="relative w-full"
              onMouseEnter={() => { setHoverTab("인성"); }}
              onMouseLeave={() => { setHoverTab(null); }}
            >
              <Button label="인성" variant="skyblue" />
              <MainDropdown isOpen={!!accessToken && hoverTab === "인성"}>
                <Link
                  className="w-full flex justify-between cursor-pointer text-body5 md:text-body3s"
                  href="/write?type=humanities"
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
              onMouseEnter={() => { setHoverTab("전공"); }}
              onMouseLeave={() => { setHoverTab(null); }}
            >
              <Button label="전공" variant="skyblue" />
              <MainDropdown isOpen={!!accessToken && hoverTab === "전공"}>
                <Link
                  className="w-full flex justify-between cursor-pointer text-body5 md:text-body3s"
                  href="/write?type=major"
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
            <Link className="w-full" href="/write?type=foreign">
              <Button label="외국어" variant="skyblue" />
            </Link>
          </div>
          <div className="flex flex-col my-9 mx-4">
            <List title="자격증">
              <section className="relative h-[28.125rem]">
                {accessToken ? (
                  certification?.data?.certificates &&
                    certification?.data?.certificates.length > 0 ? (
                    certification?.data?.certificates?.map((v, i) => (
                      <Card front={v.name} id={v.id} key={i} />
                    ))
                  ) : (
                    <h4 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-body3">
                      등록된 자격증이 존재하지 않습니다.
                    </h4>
                  )
                ) : (
                  <h4 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-body3">
                    로그인 후 확인가능합니다.
                  </h4>
                )}
              </section>
            </List>
          </div>
        </div>
      )}
      {show ? <Modal
        type={type}
        onClose={() => {
          setShow(false);
          refetch();
        }}
      /> : null}
    </div>
  );
};

export default MainView;
