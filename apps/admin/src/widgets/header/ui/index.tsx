"use client"

import TextLogo from "@repo/shared/textLogo";
import { deleteCookie } from "@repo/utils/deleteCookie";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();

  const signout = useCallback(() => {
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
    router.push("/signin");
  }, [router]);

  if (pathname === "/signin" || pathname === "/signup") return null;

  return (
    <header className="sm:py-[1.4rem] py-[1rem] flex w-full justify-around items-center border-b">
      <Link className="flex items-center" href="/">
        <TextLogo />
      </Link>

      <div className="gap-[2rem] flex text-body3 sm:text-label">
        <div className="text-errors-500 cursor-pointer " onClick={signout}>
          로그아웃
        </div>
      </div>
    </header>
  );
};

export default Header;
