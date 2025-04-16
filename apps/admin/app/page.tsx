import { useEffect } from "react";
import Header from "../src/shared/ui/header";
import Filter from "../src/widget/member/ui/filter";
import { Information } from "../src/widget/member/ui/information";
import { getMembers } from "../src/widget/member/api/getMembers";
import { useGetMember } from "../src/widget/member/model/useGetMember";
import { Member } from "../src/widget/member/model/member";
import { toast } from "sonner";

const MemberPage = () => {
  const { data, error } = useGetMember();

  if (error) toast.error(error.message);

  const members: Member[] = data?.data;
  useEffect(() => {
    const Fetch = async () => {
      const member = await getMembers();
    };
    Fetch();
  }, []);
  return (
    <div style={{ gap: "1rem" }} className="flex overflow-hidden flex-col">
      <Header />
      <div
        className="flex justify-center items-center flex-wrap"
        style={{ gap: "1.8rem" }}
      >
        {}
        <Information />
        <Filter />
      </div>
    </div>
  );
};

export default MemberPage;
