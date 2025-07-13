"use client";

import ConfirmModal from "@repo/shared/confirmModal";
import TextLogo from "@repo/shared/textLogo";
import { deleteCookie } from "@repo/utils/deleteCookie";
import { getCookie } from "@repo/utils/getCookie";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HttpStatusCode } from "axios";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Form, FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

import { patchPassword } from "@/shared/api/patchPassword";
import { Close } from "@/shared/asset/svg/close";
import { Hamburger } from "@/shared/asset/svg/hamburger";
import type { ChangePassword_StepAuthCodeForm, ChangePasswordProps } from "@/shared/model/changePassword";
import type { HttpError } from "@/shared/model/error";
import type { StepPasswordForm } from "@/shared/model/signup";
import { StepAuthcode } from "@/widgets/stepAuthcode/ui";
import { StepPassword } from "@/widgets/stepPassword/ui";
interface HeaderType {
  href: string;
  label?: string;
  active: boolean;
}

const Header = () => {
  const pathname = usePathname();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState<"confirmModal" | "changePassword" | null>(null);
  const router = useRouter();
  const queryClient = useQueryClient();

  const [step, setStep] = useState("authCode");

  useEffect(() => {
    const token = getCookie("accessToken");
    setAccessToken(token);
  }, [pathname]);

  const { mutate: changePasswordMutate } = useMutation({
    mutationFn: (form: ChangePasswordProps) => patchPassword(form),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ["auth"],
        exact: false,
      });
      if (data.status === 204) {
        toast.success("비밀번호 변경 성공");
        router.push("/signin");
      }
    },
    onError: (error: HttpError) => {
      if (error.httpStatus === HttpStatusCode.Unauthorized) {
        toast.error("이메일 인증을 먼저 진행해주세요.");
      } else {
        toast.error("비밀번호 변경에 실패했습니다.");
      }
    },
  });

  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      authcode: "",
      password: "",
      passwordCheck: ""
    },
  });

  const handleConfirmModalOpen = useCallback(() => {
    setModalOpen("confirmModal");
  }, []);

  const handleChangePasswordModalOpen = useCallback(() => {
    setModalOpen("changePassword");
  }, []);

  const handleModalClose = useCallback(() => {
    setModalOpen(null)
  }, [])

  const handleSignoutConfirm = useCallback(() => {
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
    router.push("/signin");
  }, [router]);

  const handleMenuToggle = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, [setMenuOpen]);

  const handleStopPropagation = useCallback((e: React.MouseEvent<HTMLUListElement | HTMLDivElement>) => {
    e.stopPropagation();
  }, []);

  const handleChangePassword = useCallback((form: ChangePassword_StepAuthCodeForm & StepPasswordForm) => {
    changePasswordMutate({
      email: form.email,
      password: form.password
    })
  }, [changePasswordMutate])

  const onSubmit = useCallback(async () => {
    await methods.handleSubmit(handleChangePassword)()
  }, [handleChangePassword, methods])

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

  if (pathname === "/signin" || pathname === "/signup") return null;

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
          <ul className="sm:text-label sm:flex items-center gap-[2rem] text-gray-500 text-body3 hidden">
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
                <li
                  className="hover:text-bl cursor-pointer"
                  onClick={handleChangePasswordModalOpen}
                >
                  비밀번호 변경
                </li>
                <li
                  className="text-errors-500 cursor-pointer"
                  onClick={handleConfirmModalOpen}
                >
                  로그아웃
                </li>
              </>
            )}
          </ul>
        </div>
      </header>

      <aside
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
              <li
                className="hover:text-bl cursor-pointer"
                onClick={handleChangePasswordModalOpen}
              >
                비밀번호 변경
              </li>
              <li
                className="text-errors-500 cursor-pointer"
                onClick={handleConfirmModalOpen}
              >
                로그아웃
              </li>
            </>
          )}
        </ul>
      </aside>

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

      {modalOpen == "changePassword" ? (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
          onClick={handleModalClose}
        >
          <div
            className="w-[37.5rem] bg-white md:px-[6.25rem] px-[1.5rem] py-[4.94rem] rounded-xl"
            onClick={handleStopPropagation}
          >
            <FormProvider {...methods}>
              <Form className="w-full" onSubmit={onSubmit}>
                <h1 className="text-title4s mb-6 text-center">비밀번호 변경</h1>
                {step === "authCode" &&
                  <div className="flex flex-col gap-[0.75rem] self-stretch">
                    <StepAuthcode setStep={setStep} />
                  </div>
                }
                {step == "password" &&
                  <div className="flex flex-col gap-[0.75rem] self-stretch">
                    <StepPassword isHeader />
                  </div>
                }
              </Form>
            </FormProvider>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Header;
