import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { LanguageSwitcher } from "@/components/i18n/language-switcher";
import { getMessages } from "@/lib/i18n/messages";

const navigationMocks = vi.hoisted(() => ({
  refresh: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: navigationMocks.refresh }),
}));

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  navigationMocks.refresh.mockReset();
});

describe("LanguageSwitcher", () => {
  it("shows the current language and refreshes after switching", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );
    const user = userEvent.setup();

    render(
      <LanguageSwitcher
        locale="zh"
        labels={getMessages("zh").languageSwitcher}
      />,
    );

    expect(
      screen.getByRole("group", { name: "选择语言" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "中文" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByRole("button", { name: "EN" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );

    await user.click(screen.getByRole("button", { name: "EN" }));

    expect(fetchMock).toHaveBeenCalledWith("/api/locale", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ locale: "en" }),
    });
    expect(navigationMocks.refresh).toHaveBeenCalledOnce();
  });

  it("keeps the current language selected when switching fails", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ ok: false }), { status: 500 }),
    );
    const user = userEvent.setup();

    render(
      <LanguageSwitcher
        locale="zh"
        labels={getMessages("zh").languageSwitcher}
      />,
    );

    await user.click(screen.getByRole("button", { name: "EN" }));

    expect(navigationMocks.refresh).not.toHaveBeenCalled();
    expect(
      await screen.findByText("语言切换失败，请稍后再试"),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "中文" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });
});
