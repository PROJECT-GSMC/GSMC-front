interface ListProps {
  children: React.ReactNode;
  title: string;
}

const List = ({ children, title }: ListProps) => {
  return (
    <div className="w-full h-full min-h-[27.8125rem] mb-[2.5rem] bg-tropicalblue-100 py-[2.25rem] px-[1.38rem] rounded-[1.25rem]">
      <div className="flex items-center mb-[2.2rem]">
        <h4 className="text-tropicalblue-700 text-titleSmall">{title}</h4>
      </div>
      <div className="overflow-y-auto flex flex-col h-full">{children}</div>
    </div>
  );
};

export default List;
