interface ListProps {
  children: React.ReactNode;
  title: string;
  className?: string;
}

const List = ({ children, title, className }: ListProps) => {
  return (
    <div className="w-full max-w-[37.5rem] h-full min-h-[27.8125rem] px-[2.25rem] max-h-[46.1875rem] py-[3.5rem] bg-tropicalblue-100 rounded-[1.25rem]">
      <div className="flex items-center">
        <h4 className={`text-tropicalblue-700 ${className} text-titleSmall`}>
          {title}
        </h4>
      </div>
      <div className="overflow-y-auto flex flex-col h-full">{children}</div>
    </div>
  );
};

export default List;
