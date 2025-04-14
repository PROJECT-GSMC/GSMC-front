import Link from "next/link";

interface Dropdown {
  list: Array<DropdownItem>;
}

interface DropdownItem {
  title: string;
  url?: string;
}

const MainDropdown = ({ list }: Dropdown) => {
  return (
    <div className="absolute left-0 top-full mt-2 z-10 flex flex-col gap-4 sm:gap-6 items-center justify-center rounded-lg sm:rounded-xl w-[200px] m-4 sm:w-[254px] px-6 sm:px-11 py-4 sm:py-6 bg-tropicalblue-50">
      {list.map((li) => (
        <Link key={li.title} className="w-full flex justify-between cursor-pointer text-body3s " href={li.url || ""}>
          <p>{li.title}</p>
          <p>{">"}</p>
        </Link>
      ))}
    </div>
  );
};

export default MainDropdown;
