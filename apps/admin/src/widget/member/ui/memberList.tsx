import MemberCard from "../../../entities/member/ui/memberCard";

const MemberList = () => {
  return (
    <div className="w-[573px] h-[90vh] bg-tropicalblue-100 py-[2.25rem] px-[1.38rem] rounded-[1.25rem]">
      <div className="flex items-center mb-[2.2rem]">
        <h4 className="text-tropicalblue-700 text-titleSmall">17</h4>
        <span className="text-body2">명</span>
      </div>
      <div className="overflow-y-auto flex flex-col h-full">
        <MemberCard />
        <MemberCard />
        <MemberCard />
        <MemberCard />
        <MemberCard />
        <MemberCard />
        <MemberCard />
        <MemberCard />
        <MemberCard />
        <MemberCard />
        <MemberCard />
        <MemberCard />
        <MemberCard />
        <MemberCard />
        <MemberCard />
      </div>
    </div>
  );
};

export default MemberList;
