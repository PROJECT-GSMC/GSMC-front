import SearchIcon from "@repo/ui/search";

interface SearchProps {
  ChangeName: (name: string) => void;
  name: string;
}

export const Search = ({ ChangeName, name }: SearchProps) => {
  return (
    <div className="relative">
      <input
        placeholder="학생을 검색하세요"
        className="bg-tropicalblue-50 p-[0.75rem] pl-10 rounded-[0.75rem] w-full"
        type="text"
        value={name}
        onChange={(e) => ChangeName(e.target.value)}
      />
      <SearchIcon />
    </div>
  );
};
