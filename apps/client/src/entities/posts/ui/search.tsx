"use client";

import { useEffect } from "react";
import SearchIcon from "@repo/shared/search";
import { useDebounce } from "@repo/hooks/useDebounce";
import { getSearchResult } from "../api/getSearchResult";

interface SearchProps {
  setResult: (result: string) => void;
  search: string;
  setSearch: (search: string) => void;
  type?: string;
}

const Search = ({ setResult, search, type, setSearch }: SearchProps) => {
  const debouncedValue = useDebounce(search, 500);

  useEffect(() => {
    const fetchSearchResult = async () => {
      if (!debouncedValue) return;
      const search = await getSearchResult(debouncedValue, type);
      setResult(search.data);
    };

    fetchSearchResult();
  }, [debouncedValue, setResult, type]);

  return (
    <div className="relative">
      <input
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        className="border w-full relative px-[1rem] py-[0.75rem] pl-[2.5rem] rounded-[0.625rem] my-[1.88rem] outline-tropicalblue-500"
        placeholder="찾는 내 글을 입력해주세요"
      />
      <SearchIcon />
    </div>
  );
};

export default Search;
