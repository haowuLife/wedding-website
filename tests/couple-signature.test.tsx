import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { CoupleSignature } from "@/components/layout/couple-signature";

afterEach(cleanup);

describe("CoupleSignature", () => {
  it("pairs the localized Chinese names with the English script signature", () => {
    render(<CoupleSignature locale="zh" />);

    expect(screen.getByText("吴昊 & 王璐")).toBeInTheDocument();
    expect(screen.getByText("Hao & Lu")).toHaveClass("font-script");
  });

  it("renders localized English names in the compact treatment", () => {
    render(<CoupleSignature locale="en" compact />);

    const names = screen.getByText("Hao Wu & Lu Wang");
    expect(names).toBeInTheDocument();
    expect(names.parentElement).toHaveAttribute(
      "data-compact",
      "true",
    );
  });
});
