"use client";
import { useState } from "react";

import { toast } from "sonner";
import Card from "@repo/ui/card";
import List from "@repo/ui/list";

import Header from "@shared/ui/header";
import Question from "@shared/asset/svg/question";

import { Filter } from "@widgets/member/ui/filter";
import { Information } from "@widgets/member/ui/information";

import { useGetMember } from "@widgets/member/model/useGetMember";
import { Member } from "@widgets/member/model/member";

import { getMember } from "@widgets/member/api/getMember";


const MemberPage = () => {
  const [student, setStudent] = useState<Member>();
  const [grade, setGrade] = useState<number>(0);
  const [classNumber, setClassNumber] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false)

  const { data, error } = useGetMember();
  if (error) toast.error(error.message);

  const members: Member[] = data?.data ?? [];

  const filteredMembers = members.filter((member) => {
    const gradeMatch = grade === 0 || member.grade === grade;
    const classMatch = classNumber === 0 || member.classNumber === classNumber;
    return gradeMatch && classMatch;
  });

  return (
    <div className="flex overflow-hidden h-full flex-col gap-[1rem]">
      <Header />
      <div className="flex justify-center">
        <div className="grid gap-[1.8rem] justify-center w-[37.5rem] h-full mt-[3.12rem] " >
          <div className="max-md:col-span-1 col-span-2 ">
            <List onClick={() => setOpen(!open)} title={String(filteredMembers.length)}>
              {filteredMembers.map((member) => (
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
          </div>
          {student ? (
            <Information student={student} />
          ) : (
            <div className="flex flex-col w-[17.5rem] h-[46rem] bg-tropicalblue-100 rounded-[1.25rem] px-[2.45rem] py-[2.25rem] justify-center items-center ">
              <Question />
              <span className="text-titleSmall text-[#68696C]">
                학생을 선택해주세요
              </span>
            </div>
          )}
          <div className="max-md:hidden bg-tropicalblue-100 w-[17.5rem] py-[2.25rem] rounded-[1.25rem] px-[2.45rem]">
            <Filter
              grade={grade}
              classNumber={classNumber}
              ChangeClass={setClassNumber}
              ChangeGrade={setGrade}
            />
          </div>
          {open ? (
            <>
              <div className="md:hidden fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.2)]" onClick={() => setOpen(false)}></div>
              <div className="md:hidden z-20 bg-white w-[17.5rem] py-[2.25rem] rounded-[1.25rem] px-[2.45rem] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
                <Filter
                  grade={grade}
                  classNumber={classNumber}
                  ChangeClass={setClassNumber}
                  ChangeGrade={setGrade}
                />
              </div>
            </>
          ) : ("")
          }
        </div>
      </div>
    </div>
  );
};

export default MemberPage;
