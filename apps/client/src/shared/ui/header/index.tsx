"use client";

import TextLogo from "@repo/ui/textLogo";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="w-full py-[1.38rem] flex justify-around border-b px-4">
      <div className="w-full max-w-[37.5rem] flex items-center justify-between">
        <Link href="/">
          <TextLogo />
        </Link>
        <ul className="gap-[2rem]  flex text-label text-gray-500 items-center text-body4 sm:text-body3">
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
        </ul>
      </div>
    </header>
  );
};

export default Header;
