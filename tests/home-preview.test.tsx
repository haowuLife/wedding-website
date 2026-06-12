import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HomePreview } from "@/components/home/home-preview";
import { defaultSiteContent } from "@/lib/content/site";

describe("HomePreview", () => {
  it("surfaces distinct wedding details and guest guide entries", () => {
    render(<HomePreview content={defaultSiteContent} />);

    expect(
      screen.getByRole("link", { name: "查看婚礼信息" }),
    ).toHaveAttribute("href", "/details");
    expect(
      screen.getByRole("link", { name: "查看完整宾客指南" }),
    ).toHaveAttribute("href", "/guide");
    expect(
      screen.getByRole("heading", { name: "宾客指南" }),
    ).toBeInTheDocument();

    const guideHeading = screen.getByRole("heading", { name: "宾客指南" });
    const rsvpHeading = screen.getByRole("heading", { name: "期待与你相见" });
    expect(
      guideHeading.compareDocumentPosition(rsvpHeading) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });
});
