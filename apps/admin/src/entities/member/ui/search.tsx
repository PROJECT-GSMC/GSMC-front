import SearchIcon from "../../../shared/asset/svg/search";

export const Search = () => {
  return (
    <div className=" relative">
      <input
        className="bg-tropicalblue-50 p-[0.75rem] pl-10 rounded-[0.75rem] w-full"
        type="text"
      />
      <SearchIcon />
    </div>
  );
};
