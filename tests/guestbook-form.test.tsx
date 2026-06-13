import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { GuestbookForm } from "@/components/forms/guestbook-form";
import { getMessages } from "@/lib/i18n/messages";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("GuestbookForm", () => {
  it("shows the English moderation message after submission", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );
    const user = userEvent.setup();
    render(<GuestbookForm messages={getMessages("en").guestbook} />);

    await user.type(screen.getByLabelText("Name"), "Alex");
    await user.type(screen.getByLabelText("Your Message"), "Best wishes!");
    const submitButton = screen.getByRole("button", {
      name: "Send Your Wishes",
    });
    expect(submitButton).toHaveClass("romantic-primary-button");
    await user.click(submitButton);

    expect(
      await screen.findByRole("heading", {
        name: "Your Wishes Have Been Received",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/appear after the couple reviews it/i),
    ).toBeInTheDocument();
  });
});
