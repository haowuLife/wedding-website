import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { SettingsForm } from "@/components/admin/settings-form";
import { defaultSiteContentByLocale } from "@/lib/content/site";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("SettingsForm", () => {
  it("edits English content and saves localized and shared settings", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );
    const user = userEvent.setup();

    render(
      <SettingsForm contentByLocale={defaultSiteContentByLocale} />,
    );

    await user.click(
      screen.getByRole("tab", { name: "English Content" }),
    );
    const groomInput = screen.getByLabelText("Groom Name (English)");
    await user.clear(groomInput);
    await user.type(groomInput, "Howard Wu");
    await user.click(
      screen.getByRole("button", { name: "保存全部内容" }),
    );

    expect(await screen.findByText("已保存")).toBeInTheDocument();

    const updates = fetchMock.mock.calls.map((call) =>
      JSON.parse(String(call[1]?.body)),
    ) as Array<{ key: string; value: unknown }>;

    expect(updates).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          key: "site.identity.en",
          value: expect.objectContaining({ groom: "Howard Wu" }),
        }),
        expect.objectContaining({ key: "site.story.en" }),
        expect.objectContaining({ key: "site.transport.en" }),
        expect.objectContaining({ key: "memories.enabled" }),
      ]),
    );
  });
});
