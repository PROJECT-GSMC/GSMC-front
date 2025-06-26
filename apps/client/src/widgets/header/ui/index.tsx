"use client";

import TextLogo from "@repo/shared/textLogo";
import { deleteCookie } from "@repo/utils/deleteCookie";
import { getCookie } from "@repo/utils/getCookie";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { Close } from "@/shared/asset/svg/close";
import { Hamburger } from "@/shared/asset/svg/hamburger";
import ConfirmModal from "@/widgets/confirmModal/ui";

interface HeaderType {
  href: string;
  label?: string;
  active: boolean;
}

const Header = () => {
  const pathname = usePathname();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = getCookie("accessToken");
    setAccessToken(token);
  }, [pathname]);

  const signout = useCallback(() => {
    setModalOpen(true);
  }, []);

  const handleSignoutConfirm = useCallback(() => {
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
    router.push("/signin");
  }, [router]);

  const handleMenuToggle = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, [setMenuOpen]);

  const handleStopPropagation = useCallback((e: React.MouseEvent<HTMLUListElement>) => {
    e.stopPropagation();
  }, []);

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

  if (
    pathname === "/signin" ||
    pathname === "/signup" ||
    pathname === "/changePassword"
  )
    return null;

  return (
    <>
      <header className="w-full min-h-20 sticky top-0 z-50 bg-white py-[1.38rem] flex justify-around border-b px-4">
        <div className="w-full max-w-[37.5rem] flex items-center justify-between">
          <Link href="/">
            <TextLogo />
          </Link>
          <div className="sm:hidden cursor-pointer" onClick={handleMenuToggle}>
            {menuOpen ? <Close /> : <Hamburger />}
          </div>
          <ul className=" sm:text-label sm:flex items-center gap-[2rem] text-gray-500 text-body3 hidden">
            {header.map((item: HeaderType) => (
              <li key={item.href}>
                <Link
                  className={item.active ? "text-black" : ""}
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            {accessToken === null ? null : (
              <>
                <li>
                  <Link
                    className="hover:text-bl cursor-pointer"
                    href="/changePassword"
                  >
                    비밀번호 변경
                  </Link>
                </li>
                <li
                  className="text-errors-500 cursor-pointer"
                  onClick={signout}
                >
                  로그아웃
                </li>
              </>
            )}
          </ul>
        </div>
      </header>

      <div
        className={`sm:hidden ${menuOpen ? "" : "hidden"} fixed inset-0 bg-black/50 z-40 flex items-center justify-center`}
        onClick={handleMenuToggle}
      >
        <ul
          className={`
            flex flex-col gap-[1.25rem] fixed top-20 right-0 z-50
            w-[10.5rem] h-full px-[2rem] py-[1.75rem] bg-[#DFEAFE] text-label text-gray-500
            sm:hidden ${menuOpen ? "translate-x-0 " : "translate-x-full"} duration-200 ease-in-out
          `}
          onClick={handleStopPropagation}
        >
          {header.map((item: HeaderType) => (
            <li key={item.href}>
              <Link
                className={item.active ? "text-black" : ""}
                href={item.href}
              >
                {item.label}
              </Link>
            </li>
          ))}
          {accessToken === null ? null : (
            <>
              <li>
                <Link
                  className="hover:text-bl cursor-pointer"
                  href="/changePassword"
                >
                  비밀번호 변경
                </Link>
              </li>
              <li
                className="text-errors-500 cursor-pointer"
                onClick={signout}
              >
                로그아웃
              </li>
            </>
          )}
        </ul>
      </div>
      {modalOpen ? (
        <ConfirmModal
          cancel={{
            label: "취소",
            onClick: () => {
              setModalOpen(false);
            },
          }}
          confirm={{
            label: "로그아웃",
            onClick: () => {
              setModalOpen(false);
              handleSignoutConfirm();
            },
          }}
          description="정말 로그아웃 하시겠습니까?"
          title="로그아웃"
        />
      ) : null}
    </>
  );
};

export default Header;
