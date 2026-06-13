import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { RsvpForm } from "@/components/forms/rsvp-form";
import { getMessages } from "@/lib/i18n/messages";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("RsvpForm", () => {
  it("shows the thank-you state after a successful submission", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );
    const user = userEvent.setup();
    render(<RsvpForm messages={getMessages("zh").rsvp} />);

    await user.type(screen.getByLabelText("姓名"), "周清");
    await user.type(screen.getByLabelText("手机号"), "13800001024");
    const submitButton = screen.getByRole("button", { name: "提交 RSVP" });
    expect(submitButton).toHaveClass("romantic-primary-button");
    await user.click(submitButton);

    expect(
      await screen.findByRole("heading", { name: "谢谢你的回复" }),
    ).toBeInTheDocument();
  });

  it("renders and submits the English form", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );
    const user = userEvent.setup();
    render(<RsvpForm messages={getMessages("en").rsvp} />);

    await user.type(screen.getByLabelText("Name"), "Alex");
    await user.type(screen.getByLabelText("Phone Number"), "13800001024");
    await user.click(screen.getByRole("button", { name: "Submit RSVP" }));

    expect(
      await screen.findByRole("heading", {
        name: "Thank You for Your Reply",
      }),
    ).toBeInTheDocument();
  });
});
