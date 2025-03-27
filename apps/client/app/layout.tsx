import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GSMC",
  description: "GSM 인증제 작성 웹사이트입니다",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col h-screen justify-center items-center bg-main-100">{children}</body>
    </html>
  );
}
