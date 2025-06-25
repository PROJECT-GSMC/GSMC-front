"use client";

import TextLogo from "@repo/shared/textLogo";
import { deleteCookie } from "@repo/utils/deleteCookie";
import { getCookie } from "@repo/utils/getCookie";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { Close } from "@/shared/asset/svg/close";
import { Hamburger } from "@/shared/asset/svg/hamburger";

const Header = () => {
  const pathname = usePathname();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = getCookie("accessToken");
    setAccessToken(token);
  }, []);

  const signout = useCallback(() => {
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
    router.push("/signin");
  }, [router]);

  interface HeaderType {
    href: string;
    label?: string;
    active: boolean;
  }

  const header = [
    {
      href: "/calculate",
      label: "점수 계산",
      active: pathname === "/calculate",
    },
    {
      href: "/example",
      label: "예시",
      active: pathname === "/example",
    },
    {
      href: "/posts",
      label: "내 글 목록",
      active: pathname === "/posts",
    },
  ];

  const handleMenuToggle = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, [setMenuOpen]);

  if (accessToken === null) return null;
  if (
    pathname === "/signin" ||
    pathname === "/signup" ||
    pathname === "/changePassword"
  )
    return null;
  return (
    <>
      <header className="w-full py-[1.38rem] flex justify-around border-b px-4">
        <div className="w-full max-w-[37.5rem] flex items-center justify-between">
          <Link href="/">
            <TextLogo />
          </Link>

          <div className="sm:hidden cursor-pointer" onClick={handleMenuToggle}>
            {menuOpen ? <Hamburger /> : <Close />}
          </div>

          <ul className="hidden sm:flex gap-[2rem] text-gray-500 items-center text-body3 sm:text-label">
            {header.map((item: HeaderType) => {
              return (
                <li key={item.href}>
                  <Link
                    className={item.active ? "text-black" : ""}
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
            {accessToken ? (
              <>
                <Link
                  className="hover:text-bl cursor-pointer"
                  href="/changePassword"
                >
                  비밀번호 변경
                </Link>
                <li
                  className="text-errors-500 cursor-pointer"
                  onClick={signout}
                >
                  로그아웃
                </li>
              </>
            ) : null}
          </ul>
        </div>
      </header>
      <section className="absolute right-0 h-full">
        {!menuOpen && (
          <ul className="flex flex-col sticky top-0 right-0 w-[10.5rem] h-full z-20 sm:hidden bg-[#DFEAFE] text-label gap-[1.25rem] px-[2rem] py-[1.75rem] shadow-[-10px_0_10px_rgba(0,0,0,0.1)]">
            {header.map((item: HeaderType) => {
              return (
                <li key={item.href}>
                  <Link
                    className={item.active ? "text-black" : ""}
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
            {accessToken ? (
              <>
                <Link
                  className="hover:text-bl cursor-pointer"
                  href="/changePassword"
                >
                  비밀번호 변경
                </Link>
                <li
                  className="text-errors-500 cursor-pointer"
                  onClick={signout}
                >
                  로그아웃
                </li>
              </>
            ) : null}
          </ul>
        )}
      </section>
    </>
  );
};

export default Header;
