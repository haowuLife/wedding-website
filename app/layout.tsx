import type { Metadata, Viewport } from "next";

import "./globals.css";

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
  themeColor: "#f6f1e8",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" data-scroll-behavior="smooth">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
