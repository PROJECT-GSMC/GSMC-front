import { PostProvider } from "@repo/store/postProvider";
import type { Metadata } from "next";
import { Toaster } from "sonner";

import { Header } from "@/shared/ui";

import Providers from "./providers";
import "./globals.css";

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
      <body>
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
