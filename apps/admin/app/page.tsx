import Header from "../src/shared/ui/header";
import Filter from "../src/widget/member/ui/filter";
import { Information } from "../src/widget/member/ui/information";
import MemberList from "../src/widget/member/ui/memberList";

const MemberPage = () => {
  return (
    <div style={{ gap: "1rem" }} className="flex overflow-hidden flex-col">
      <Header />
      <div
        className="flex justify-center items-center flex-wrap"
        style={{ gap: "1.8rem" }}
      >
        <MemberList />
        <Information />
        <Filter />
      </div>
    </div>
  );
};

export default MemberPage;
