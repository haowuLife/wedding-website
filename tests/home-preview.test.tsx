import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HomePreview } from "@/components/home/home-preview";
import { defaultSiteContentByLocale } from "@/lib/content/site";
import { getMessages } from "@/lib/i18n/messages";

describe("HomePreview", () => {
  it("surfaces distinct wedding details and guest guide entries", () => {
    render(
      <HomePreview
        content={defaultSiteContentByLocale.zh}
        messages={getMessages("zh").home}
      />,
    );

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

  it("renders the complete English home invitation", () => {
    render(
      <HomePreview
        content={defaultSiteContentByLocale.en}
        messages={getMessages("en").home}
      />,
    );

    expect(
      screen.getByRole("heading", { name: "We Are Getting Married" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Guest Guide" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: "View the Complete Guest Guide",
      }),
    ).toHaveAttribute("href", "/guide");
  });
});
