"use client";
import { useState } from "react";

import { toast } from "sonner";
import Card from "@repo/shared/card";
import List from "@repo/shared/list";
import { Button } from "@repo/shared/button";

import Header from "@shared/ui/header";
import Question from "@shared/asset/svg/question";

import { Filter } from "@widgets/member/ui/filter";
import { Information } from "@widgets/member/ui/information";
import { useGetMember } from "@widgets/member/model/useGetMember";
import { Member } from "@widgets/member/model/member";
import { getMember } from "@widgets/member/api/getMember";

const MemberPage = () => {
  const [open, setOpen] = useState<boolean>(false)

  const [student, setStudent] = useState<Member>();

  const [grade, setGrade] = useState<number>(0);
  const [classNumber, setClassNumber] = useState<number>(0);
  const [name, setName] = useState<string>('');

  const { data, error, refetch, isFetching } = useGetMember({ grade, classNumber, name });

  if (error) toast.error(error.message);

  const members: Member[] = data?.data ?? [];

  const resetFilter = () => {
    setGrade(0)
    setClassNumber(0)
    setName('')
  }

  const reSearch = () => {
    if (!isFetching) {
      refetch()
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 h-screen">
      <Header />
      <main className="w-full h-full pt-[3.12rem] pb-[1.44rem] max-sm:px-[2.75rem] max-md:px-[4.75rem] md:px-[6.75rem] ">
        <div className="h-full grid grid-cols-8 max-sm:grid-cols-1 max-sm:grid-rows-2 gap-[1.8rem]" >
          <section className="col-span-5 max-sm:col-span-1">
            <List onClick={() => setOpen(!open)} title={String(members.length)} isFilter={true}>
              {members.map((member) => (
                <Card
                  onClick={async () => {
                    const res = await getMember(member.email);
                    setStudent(res.data);
                  }}
                  id={member.email}
                  key={member.email}
                  front={member.name}
                  back={
                    member.grade +
                    member.classNumber +
                    String(member.number).padStart(2, "0")
                  }
                />
              ))}
            </List>
          </section>
          <section className="col-span-3 max-sm:col-span-1">
            {student ? (
              <Information student={student} />
            ) : (
              <div className="flex flex-col bg-tropicalblue-100 rounded-[1.25rem] px-[2.45rem] py-[2.25rem] h-full justify-center items-center ">
                <Question />
                <span className="text-titleSmall text-[#68696C]">
                  학생을 선택해주세요
                </span>
              </div>
            )}
          </section>
          {open &&
            <>
              <div className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.2)]" onClick={() => setOpen(false)}></div>
              <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white z-20
                rounded-[1.25rem] px-[2.45rem] py-[2.25rem] max-sm:w-[20.5rem] max-md:w-[22.5rem] md:w-[24.5rem]"
              >
                <Filter
                  grade={grade}
                  classNumber={classNumber}
                  name={name}
                  ChangeClass={setClassNumber}
                  ChangeGrade={setGrade}
                  ChangeName={setName}
                />
                <div className="flex flex-col gap-[0.75rem] mt-[2rem]">
                  <Button label="초기화" variant="skyblue" onClick={() => resetFilter()} />
                  <Button label="적용하기" variant="blue" onClick={() => reSearch()} />
                </div>
              </div>
            </>
          }
        </div>
      </main>
    </div>
  );
};

export default MemberPage;
