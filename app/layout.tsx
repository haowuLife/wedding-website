import type { Metadata, Viewport } from "next";
import { Great_Vibes, Noto_Sans_SC, Noto_Serif_SC } from "next/font/google";

import "./globals.css";

const notoSerifSc = Noto_Serif_SC({
  variable: "--font-noto-serif-sc",
  subsets: ["latin"],
  display: "swap",
});

const notoSansSc = Noto_Sans_SC({
  variable: "--font-noto-sans-sc",
  subsets: ["latin"],
  display: "swap",
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "吴昊 & 王璐的婚礼",
    template: "%s · 吴昊 & 王璐",
  },
  description: "诚邀您见证吴昊与王璐于 2026 年 10 月 6 日在泰兴举行的婚礼。",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fffaf5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" data-scroll-behavior="smooth">
      <body
        className={`${notoSerifSc.variable} ${notoSansSc.variable} ${greatVibes.variable}`}
      >
        <main>{children}</main>
      </body>
    </html>
  );
}
