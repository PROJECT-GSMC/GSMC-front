import { Toaster } from "sonner";
import "./globals.css";
import type { Metadata } from "next";
import Providers from "./providers";
import { PostProvider } from "@repo/store/postProvider";

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
          <Providers>{children}</Providers>
        </PostProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}
