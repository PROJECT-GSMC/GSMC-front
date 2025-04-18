"use client";

import Header from "../src/shared/ui/header";
import Filter from "../src/widget/member/ui/filter";
import { Information } from "../src/widget/member/ui/information";
import { useGetMember } from "../src/widget/member/model/useGetMember";
import { Member } from "../src/widget/member/model/member";
import { toast } from "sonner";
import Card from "@repo/ui/card";
import { useState } from "react";
import { getMember } from "../src/widget/member/api/getMember";
import List from "@repo/ui/list";
import Question from "../src/shared/asset/svg/question";

const MemberPage = () => {
  const [student, setStudent] = useState<Member>();
  const [grade, setGrade] = useState<number>(0);
  const [classNumber, setClassNumber] = useState<number>(0);

  const { data, error } = useGetMember();
  if (error) toast.error(error.message);

  const members: Member[] = data?.data ?? [];

  const filteredMembers = members.filter((member) => {
    const gradeMatch = grade === 0 || member.grade === grade;
    const classMatch = classNumber === 0 || member.classNumber === classNumber;
    return gradeMatch && classMatch;
  });

  return (
    <div
      style={{ gap: "1rem" }}
      className="flex overflow-hidden h-full flex-col"
    >
      <Header />
      <div
        className="flex justify-center items-center w-full h-full mt-[3.12rem]"
        style={{ gap: "1.8rem" }}
      >
        <List className="h-[46rem]" title={String(filteredMembers.length)}>
          {filteredMembers.map((member) => (
            <Card
              onClick={async () => {
                const res = await getMember(member.email);
                setStudent(res.data);
              }}
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
        {student ? (
          <Information student={student} />
        ) : (
          <div className="w-[350px] min-w-[18rem] bg-tropicalblue-100 py-[2.25rem] flex flex-col justify-center items-center rounded-[1.25rem] h-[46rem] px-[2.45rem]">
            <Question />
            <span className="text-titleSmall text-[#68696C]">
              학생을 선택해주세요
            </span>
          </div>
        )}
        <Filter
          grade={grade}
          classNumber={classNumber}
          ChangeClass={setClassNumber}
          ChangeGrade={setGrade}
        />
      </div>
    </div>
  );
};

export default MemberPage;
