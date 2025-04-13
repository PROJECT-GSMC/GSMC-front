"use client";

import TextLogo from "@repo/ui/textLogo";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();

  return (
<<<<<<< HEAD
    <header className="w-full py-[1.38rem] flex justify-center border-b">
      <div className="w-[37.5rem] flex justify-between items-center">
=======
    <header className="w-full py-[1.38rem] flex justify-around border-b">
      <div className="w-full max-w-[37.5rem] flex items-center justify-between">
>>>>>>> 0d10f325391b835385a69c3a824e1557b18ebf7e
        <Link href="/">
          <TextLogo />
        </Link>
        <ul className="gap-[2rem] flex text-label text-gray-500 items-center text-body3">
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
