import Card from "@repo/ui/card";

interface ListProps<T> {
  values: T[];
  title: string;
}

const List = <T,>({ values, title }: ListProps<T>) => {
  return (
    <div className="w-[573px] h-full mb-[2.5rem] bg-tropicalblue-100 py-[2.25rem] px-[1.38rem] rounded-[1.25rem]">
      <div className="flex items-center mb-[2.2rem]">
        <h4 className="text-tropicalblue-700 text-titleSmall">17</h4>
        <span className="text-body2">{title}</span>
      </div>
      <div className="overflow-y-auto flex flex-col h-full">
        <Card front="회원 목록" back="회원 목록" onClick={() => {}} />
        <Card front="회원 목록" back="회원 목록" onClick={() => {}} />
        <Card front="회원 목록" back="회원 목록" onClick={() => {}} />
        <Card front="회원 목록" back="회원 목록" onClick={() => {}} />
        {/* {member.map((item, index) => (
          <Card
            key={index}
            front={JSON.stringify(item)}
            back="회원 목록"
            onClick={() => {}}
          />
        ))} */}
      </div>
    </div>
  );
};

export default List;
