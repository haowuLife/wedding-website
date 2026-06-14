import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { SiteHeader } from "@/components/layout/site-header";
import { getMessages } from "@/lib/i18n/messages";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({ refresh: vi.fn() }),
}));

afterEach(cleanup);

describe("SiteHeader", () => {
  it("keeps the disabled background-music control on desktop", () => {
    render(
      <SiteHeader
        locale="zh"
        navigation={[
          { label: "首页", href: "/" },
          { label: "我们的故事", href: "/story" },
        ]}
        messages={getMessages("zh")}
      />,
    );

    expect(
      screen.getByRole("button", { name: "背景音乐暂未启用" }),
    ).toBeDisabled();
  });
});
