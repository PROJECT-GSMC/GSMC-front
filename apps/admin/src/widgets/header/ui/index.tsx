"use client"

import ConfirmModal from "@repo/shared/confirmModal";
import TextLogo from "@repo/shared/textLogo";
import { deleteCookie } from "@repo/utils/deleteCookie";
import { getCookie } from "@repo/utils/getCookie";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const Header = () => {
  const pathname = usePathname();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState<"confirmModal" | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = getCookie("accessToken");
    setAccessToken(token);
  }, [pathname]);

  const handleConfirmModalOpen = useCallback(() => {
    setModalOpen("confirmModal");
  }, []);

  const handleSignoutConfirm = useCallback(() => {
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
    router.push("/signin");
  }, [router]);

  if (pathname === "/signin" || pathname === "/signup") return null;

  return (
    <>
      <header className="w-full min-h-20 sticky top-0 z-50 bg-white py-[1.38rem] flex justify-around border-b px-4">
        <div className="w-full max-w-[37.5rem] flex items-center justify-between">
          <Link href="/">
            <TextLogo />
          </Link>
          <ul className="sm:text-label sm:flex items-center gap-[2rem] text-gray-500 text-body3 hidden">
            {accessToken == null ? null :
              <li
                className="text-errors-500 cursor-pointer "
                onClick={handleConfirmModalOpen}
              >
                로그아웃
              </li>}
          </ul>
        </div>
      </header>

      {modalOpen == "confirmModal" ? (
        <ConfirmModal
          cancel={{
            label: "취소",
            onClick: () => {
              setModalOpen(null);
            },
          }}
          confirm={{
            label: "로그아웃",
            onClick: () => {
              setModalOpen(null);
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
