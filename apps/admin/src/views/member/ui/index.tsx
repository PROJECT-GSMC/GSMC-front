"use client";

import { Button } from "@repo/shared/button";
import Card from "@repo/shared/card";
import List from "@repo/shared/list";
import type { Member } from "@repo/types/member";
import { useState, useCallback } from "react";
import { toast } from "sonner";

import { getSearchedMembers } from "@/entities/member/api/getSearchedMembers";
import Information from "@/widgets/member/ui/information";
import Question from "@shared/asset/svg/question";
import Header from "@shared/ui/header";
import { getMember } from "@widgets/member/api/getMember";
import { useGetMember } from "@widgets/member/model/useGetMember";
import { Filter } from "@widgets/member/ui/filter";

const MemberView = () => {
  const [click, setClick] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [student, setStudent] = useState<Member>();
  const [result, setResult] = useState<Member[] | null>(null);
  const [grade, setGrade] = useState<number>();
  const [classNumber, setClassNumber] = useState<number>();
  const [name, setName] = useState<string>();

  const { data, error, isLoading } = useGetMember();

  if (error) toast.error("학생 목록을 불러오지 못했습니다.");

  const members = (data?.data ?? []) as Member[];

  const resetFilter = useCallback((): void => {
    setGrade(undefined);
    setClassNumber(undefined);
    setName(undefined);
  }, []);

  const handleOpen = useCallback((): void => {
    setOpen((prev) => !prev);
  }, []);
  const handleCardClick = useCallback(async (email: string): Promise<void> => {
    setClick(email);
    try {
      const res = await getMember(email);
      setStudent(res.data);
    } catch {
      toast.error("학생정보 불러오는데 실패하였습니다.");
    }
  }, []);

  const handleSearch = useCallback(async (): Promise<void> => {
    const res = await getSearchedMembers({
      classNumber,
      grade,
      name,
      page: 1,
      size: 100,
    });
    if (res.status === 200) {
      if (res.data.results.length === 0) {
        toast.error("검색된 학생이 없습니다.");
      } else {
        setOpen(false);
        setResult([...res.data.results]);
        console.log(res);
      }
    }
  }, [classNumber, grade, name]);

  const memoizedCardClick = useCallback(
    (email: string) => (): void => {
      void handleCardClick(email);
    },
    [handleCardClick]
  );

  const memoizedSearch = useCallback((): void => {
    void handleSearch();
  }, [handleSearch]);

  return (
    <div className="flex flex-col items-center gap-4 h-screen">
      <Header />
      <main className="w-full h-full pt-[3.12rem] pb-[1.44rem] max-sm:px-[2.75rem] max-md:px-[4.75rem] md:px-[6.75rem]">
        <div className="h-full grid grid-cols-8 max-lg:grid-cols-1 max-lg:grid-rows-2 gap-[1.8rem]">
          <section className="col-span-5 max-lg:col-span-1">
            <List
              isFilter
              className="my-3 mx-3"
              title="학생 목록"
              onClick={handleOpen}
            >
              {(() => {
                if (isLoading) {
                  return <div className="text-center mt-24">loading...</div>;
                }

                const target =
                  Array.isArray(result) &&
                  (result.length > 0 || name || grade || classNumber)
                    ? result
                    : members;

                return target.map((member: Member) => (
                  <Card
                    Pending={member.hasPendingEvidence}
                    back={
                      String(member.grade) +
                      String(member.classNumber) +
                      String(member.number).padStart(2, "0")
                    }
                    className={
                      click === member.email
                        ? "bg-[#EFF5FF] rounded-[0.75rem]"
                        : "bg-[#DFEAFE]"
                    }
                    front={member.name}
                    id={member.email}
                    key={member.email}
                    onClick={memoizedCardClick(member.email)}
                  />
                ));
              })()}
            </List>
          </section>
          <section className="col-span-3 max-lg:col-span-1">
            {student === undefined ? (
              <div className="flex flex-col bg-tropicalblue-100 rounded-[1.25rem] px-[2.45rem] py-[2.25rem] h-full justify-center items-center">
                <Question />
                <span className="text-titleSmall text-[#68696C]">
                  학생을 선택해주세요
                </span>
              </div>
            ) : (
              <Information student={student} />
            )}
          </section>
          {open ? (
            <>
              <div
                className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.2)]"
                onClick={handleOpen}
              />
              <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white z-20 rounded-[1.25rem] px-[2.45rem] py-[2.25rem] max-sm:w-[20.5rem] max-md:w-[22.5rem] md:w-[24.5rem]">
                <Filter
                  ChangeClass={setClassNumber}
                  ChangeGrade={setGrade}
                  ChangeName={setName}
                  classNumber={classNumber ?? 0}
                  grade={grade ?? 0}
                  name={name ?? ""}
                />
                <div className="flex flex-col gap-[0.75rem] mt-[2rem]">
                  <Button
                    label="초기화"
                    variant="skyblue"
                    onClick={resetFilter}
                  />
                  <Button
                    label="적용하기"
                    variant="blue"
                    onClick={memoizedSearch}
                  />
                </div>
              </div>
            </>
          ) : null}
        </div>
      </main>
    </div>
  );
};

export default MemberView;
