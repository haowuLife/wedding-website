import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { YouyouCard } from "@/components/youyou/youyou-card";
import { getMessages } from "@/lib/i18n/messages";

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

describe("YouyouCard", () => {
  it("shows one paw stamp after the portrait is activated", () => {
    vi.useFakeTimers();
    const messages = getMessages("zh").youyou;

    render(<YouyouCard variant="family" messages={messages} />);

    expect(
      screen.getByRole("heading", { name: messages.familyTitle }),
    ).toBeVisible();
    expect(screen.queryByTestId("youyou-paw-stamp")).not.toBeInTheDocument();

    const portrait = screen.getByRole("button", {
      name: messages.avatarActionLabel,
    });
    fireEvent.click(portrait);
    expect(screen.getAllByTestId("youyou-paw-stamp")).toHaveLength(1);

    fireEvent.click(portrait);
    expect(screen.getAllByTestId("youyou-paw-stamp")).toHaveLength(1);

    act(() => {
      vi.advanceTimersByTime(1_500);
    });
    expect(screen.queryByTestId("youyou-paw-stamp")).not.toBeInTheDocument();
  });

  it("uses the approved welcome message in the steward treatment", () => {
    const messages = getMessages("zh").youyou;

    render(
      <YouyouCard variant="steward" context="rsvp" messages={messages} />,
    );

    expect(
      screen.getByRole("heading", { name: messages.stewardTitle }),
    ).toBeVisible();
    expect(screen.getByText(messages.welcome)).toBeVisible();
    expect(screen.getByText(messages.rsvpDescription)).toBeVisible();
  });
});
