import "./globals.css";
import type { Metadata } from "next";
import Providers from "./providers";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "GSMC",
  description:
    "광주소프트웨어마이스터고등학교 인증제 관리 시스템의 admin 웹페이지입니다",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
        <Toaster richColors />
      </body>
    </html>
  );
}
