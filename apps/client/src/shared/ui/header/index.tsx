"use client";


import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import TextLogo from "@repo/ui/textLogo";
import { getCookie } from "node_modules/@repo/ui/src/utils/getCookie";
import { deleteCookie } from "node_modules/@repo/ui/src/utils/deleteCookie";

const Header = () => {
  const pathname = usePathname();
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const token = getCookie("accessToken");
    setAccessToken(token);
  }, []);

  const deleteToken = () => {
    deleteCookie("accessToken")
    deleteCookie("refreshToken")
  }

  return (
    <header className="w-full py-[1.38rem] flex justify-around border-b px-4">
      <div className="w-full max-w-[37.5rem] flex items-center justify-between">
        <Link href="/">
          <TextLogo />
        </Link>
        <ul className="gap-[2rem] flex text-gray-500 items-center text-body3 sm:text-label">
          <li>
            <Link
              className={pathname === "/calculate" ? "text-black" : ""}
              href="/calculate"
            >
              점수 계산
            </Link>
          </li>
          <li>
            <Link
              className={pathname === "/example" ? "text-black" : ""}
              href="/example"
            >
              예시
            </Link>
          </li>
          <li>
            <Link
              className={pathname === "/posts" ? "text-black" : ""}
              href="/posts"
            >
              내 글 목록
            </Link>
          </li>
          <li
            className="hover:text-black cursor-pointer"
          >
            비밀번호 변경
          </li>
          {accessToken &&
            <li
              className="hover:text-black cursor-pointer"
              onClick={() => deleteToken()}
            >
              로그아웃
            </li>}
        </ul>
      </div>
    </header>
  );
};

export default Header;
