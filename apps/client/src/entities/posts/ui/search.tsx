"use client";

import { useDebounce } from "@repo/hooks/useDebounce";
import SearchIcon from "@repo/shared/search";
import type { EvidenceResponse } from "@repo/types/evidences";
import { useCallback, useEffect } from "react";
import { toast } from "sonner";

import { getSearchResult } from "../api/getSearchResult";

interface SearchProps {
  setResult: (result: EvidenceResponse) => void;
  search: string;
  setSearch: (search: string) => void;
  type?: string;
}

const Search = ({ setResult, search, type, setSearch }: SearchProps) => {
  const debouncedValue = useDebounce(search, 500);

  useEffect(() => {
    const fetchSearchResult = async () => {
      if (!debouncedValue) return;

      try {
        const search = await getSearchResult(debouncedValue, type);
        setResult(search.data as EvidenceResponse);
      } catch {
        toast.error("")
      }
    };

    // Promise를 명시적으로 처리
    void fetchSearchResult();
  }, [debouncedValue, setResult, type]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, [setSearch]);

  return (
    <div className="relative">
      <input
        className="border w-full relative px-[1rem] py-[0.75rem] pl-[2.5rem] rounded-[0.625rem] my-[1.88rem] outline-tropicalblue-500"
        placeholder="찾는 내 글을 입력해주세요"
        type="text"
        onChange={handleChange}
      />
      <SearchIcon />
    </div>
  );
};

export default Search;
