import SearchIcon from "@repo/shared/search";
import { useCallback } from "react";

interface SearchProps {
  name: string;
  ChangeName: (name: string) => void;
}

export default function Search({ name, ChangeName }: SearchProps) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      ChangeName(e.target.value);
    },
    [ChangeName],
  );

  return (
    <div className="relative">
      <input
        className="bg-tropicalblue-50 p-[0.75rem] pl-10 rounded-[0.75rem] w-full"
        placeholder="학생을 검색하세요"
        type="text"
        value={name}
        onChange={handleChange}
      />
      <SearchIcon />
    </div>
  );
}
