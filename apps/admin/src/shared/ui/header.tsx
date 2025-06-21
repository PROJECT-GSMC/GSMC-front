import TextLogo from "@repo/shared/textLogo";
import { deleteCookie } from "@repo/utils/deleteCookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

const Header = () => {
  const router = useRouter();

  const signout = useCallback(() => {
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
    router.push("/signin");
  }, [router]);
  return (
    <header className="sm:py-[1.4rem] py-[1rem] flex w-full justify-around items-center border-b">
      <Link className="flex items-center" href="/">
        <TextLogo />
      </Link>

      <div className="gap-[2rem] flex text-body3 sm:text-label">
        <Link className="hover:text-bl cursor-pointer" href="/changePassword">
          비밀번호 변경
        </Link>
        <div className="text-errors-500 cursor-pointer " onClick={signout}>
          로그아웃
        </div>
      </div>
    </header>
  );
};

export default Header;
