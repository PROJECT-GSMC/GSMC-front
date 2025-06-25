import { PostProvider } from "@repo/store/postProvider";
import type { Metadata } from "next";
import { Toaster } from "sonner";

import { Header } from "@/shared/ui";

import Providers from "./providers";


import "./globals.css";

export const metadata: Metadata = {
  title: "GSMC",
  description: "광주소프트웨어마이스터고 인증제 통합 관리 시스템",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "GSMC",
    description: "광주소프트웨어마이스터고 인증제 통합 관리 시스템",
    url: "https://gsmc.kro.kr",
    images: [
      {
        url: "https://gsmc.kro.kr/og-image.png",
        width: 1200,
        height: 630,
        alt: "GSMC OG 이미지",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative">
        <PostProvider>
          <Providers>
            <Header />
            {children}
          </Providers>
        </PostProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}
