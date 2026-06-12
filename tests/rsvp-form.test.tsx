import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { RsvpForm } from "@/components/forms/rsvp-form";

afterEach(() => {
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
    render(<RsvpForm />);

    await user.type(screen.getByLabelText("姓名"), "周清");
    await user.type(screen.getByLabelText("手机号"), "13800001024");
    await user.click(screen.getByRole("button", { name: "提交 RSVP" }));

    expect(
      await screen.findByRole("heading", { name: "谢谢你的回复" }),
    ).toBeInTheDocument();
  });
});
