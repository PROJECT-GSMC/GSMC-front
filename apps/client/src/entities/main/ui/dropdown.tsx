interface Dropdown {
  list: Array<DropdownItem>
}

interface DropdownItem {
  title: string
  url: string
}

const MainDropdown = ({ list }: Dropdown) => {
  return (
    <div className="absolute left-0 top-full mt-2 z-10 flex flex-col gap-6 items-center justify-center rounded-xl w-[254px] px-11 py-6 bg-tropicalblue-50">
      {list.map((li) =>
        <a className="w-full flex justify-between cursor-pointer" href={li.url}>
          <p>{li.title}</p>
          <p>{">"}</p>
        </a>
      )}
    </div>
  );
};

export default MainDropdown;
