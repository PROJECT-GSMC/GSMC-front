"use client";

import { Button } from "@repo/shared/button";
import Card from "@repo/shared/card";
import List from "@repo/shared/list";
import type { Member } from "@repo/types/member";
import Question from "@shared/asset/svg/question";
import { Filter } from "@widgets/member/ui/filter";
import { useState, useCallback } from "react";
import { toast } from "sonner";

import { getSearchedMembers } from "@/entities/member/api/getSearchedMembers";
import { useMember } from "@/entities/member/model/memberContext";
import { getMember } from "@/shared/api/getMember";
import { useGetMembers } from "@/shared/model/useGetMembers";
import Information from "@/widgets/member/ui/information";

const MemberView = () => {
  const [click, setClick] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const { member: student, setMember: setStudent } = useMember();
  const [result, setResult] = useState<Member[]>([]);
  const [grade, setGrade] = useState<number>();
  const [classNumber, setClassNumber] = useState<number>();
  const [name, setName] = useState<string>();

  const { data, isError } = useGetMembers();

  if (isError) toast.error("학생 목록을 불러오지 못했습니다.");

  const members = (data?.data ?? []);

  const resetFilter = useCallback((): void => {
    setGrade(undefined);
    setClassNumber(undefined);
    setName(undefined);
  }, []);

  const handleOpen = useCallback((): void => {
    setOpen((prev) => !prev);
  }, []);

  const handleCardClick = useCallback(
    async (email: string): Promise<void> => {
      setClick(email);
      try {
        const res = await getMember(email);
        setStudent(res.data);
      } catch {
        toast.error("학생정보 불러오는데 실패하였습니다.");
      }
    },
    [setStudent],
  );

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
      }
    }
  }, [classNumber, grade, name]);

  const memoizedCardClick = useCallback(
    (email: string) => (): void => {
      void handleCardClick(email);
    },
    [handleCardClick],
  );

  const memoizedSearch = useCallback((): void => {
    void handleSearch();
  }, [handleSearch]);

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <div className="w-full max-w-[59.5625rem] h-[46.1875rem] max-lg:min-h-[46.1875rem] flex flex-row max-lg:flex-col justify-center gap-[1.8rem]">
        <List
          isFilter
          className="flex-grow h-full"
          title="학생 목록"
          onClick={handleOpen}
        >
          {(() => {
            const target = result.length > 0 ? result : members;
            return target.map((member) => (
              <Card
                Pending={member.hasPendingEvidence}
                back={Number(
                  String(member.grade) +
                  String(member.classNumber) +
                  String(member.number).padStart(2, "0"),
                )}
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
        {student === undefined ? (
          <div className="flex flex-col justify-center items-center min-w-[21.875rem] h-full bg-tropicalblue-100 rounded-[1.25rem] px-[2.45rem] py-[2.25rem]">
            <Question />
            <span className="max-w-max text-titleSmall text-[#68696C]">
              학생을 선택해주세요
            </span>
          </div>
        ) : (
          <Information />
        )}
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
    </div>
  );
};

export default MemberView;
