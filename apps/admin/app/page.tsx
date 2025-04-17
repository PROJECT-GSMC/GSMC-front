import Header from "../src/shared/ui/header";
import Filter from "../src/widget/member/ui/filter";
import { Information } from "../src/widget/member/ui/information";
import { useGetMember } from "../src/widget/member/model/useGetMember";
import { Member } from "../src/widget/member/model/member";
import { toast } from "sonner";
import Card from "@repo/ui/card";

const MemberPage = () => {
  const { data, error } = useGetMember();

  if (error) toast.error(error.message);

  const members: Member[] = data?.data;
  return (
    <div style={{ gap: "1rem" }} className="flex overflow-hidden flex-col">
      <Header />
      <div
        className="flex justify-center items-center flex-wrap"
        style={{ gap: "1.8rem" }}
      >
        {members.map((members) => {
          return (
            <Card
              key={members.email}
              front={members.name}
              back={
                members.grade +
                members.classNumber +
                String(members.number).padStart(2, "0")
              }
            />
          );
        })}
        <Information />
        <Filter />
      </div>
    </div>
  );
};

export default MemberPage;
