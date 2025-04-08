import SearchIcon from "@repo/ui/search";

const Search = () => {
  return (
    <div className="relative">
      <input
        type="text"
        className="border w-full relative px-[1rem] py-[0.75rem] pl-[2.5rem] rounded-[0.625rem] my-[1.88rem] outline-tropicalblue-500"
        placeholder="찾는 내 글을 입력해주세요"
      />
      <SearchIcon />
    </div>
  );
};

export default Search;
