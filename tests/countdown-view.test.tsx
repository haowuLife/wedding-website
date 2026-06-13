import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Countdown } from "@/components/home/countdown";
import { getMessages } from "@/lib/i18n/messages";

describe("Countdown", () => {
  it("renders English labels and accessibility text", () => {
    render(
      <Countdown
        target="2026-10-06T12:00:00+08:00"
        messages={getMessages("en").countdown}
      />,
    );

    expect(
      screen.getByLabelText("Countdown to the wedding"),
    ).toBeInTheDocument();
    expect(screen.getByText("Days")).toBeInTheDocument();
    expect(screen.getByText("Hours")).toBeInTheDocument();
    expect(screen.getByText("Minutes")).toBeInTheDocument();
    expect(screen.getByText("Seconds")).toBeInTheDocument();
  });
});
