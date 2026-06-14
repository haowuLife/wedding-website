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
        youyouMessages={getMessages("zh").youyou}
      />,
    );

    expect(screen.getByTestId("home-preview")).toHaveClass(
      "modern-romantic-home",
    );
    expect(
      screen.getByRole("link", { name: "查看婚礼信息" }),
    ).toHaveAttribute("href", "/details");
    expect(
      screen.getByRole("link", { name: "查看完整宾客指南" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "查看完整宾客指南" }),
    ).toHaveAttribute("href", "/guide");
    expect(
      screen.getByRole("heading", { name: "宾客指南" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "我们的特别家人 · 呦呦" }),
    ).toBeInTheDocument();

    const invitationHeading = screen.getByRole("heading", {
      name: "我们要结婚了",
    });
    const youyouHeading = screen.getByRole("heading", {
      name: "我们的特别家人 · 呦呦",
    });
    const storyHeading = screen.getByRole("heading", {
      name: "从一次偶遇，到一生同行",
    });
    const guideHeading = screen.getByRole("heading", { name: "宾客指南" });
    const rsvpHeading = screen.getByRole("heading", { name: "期待与你相见" });
    expect(
      invitationHeading.compareDocumentPosition(youyouHeading) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      youyouHeading.compareDocumentPosition(storyHeading) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
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
        youyouMessages={getMessages("en").youyou}
      />,
    );

    expect(
      screen.getByRole("heading", { name: "We Are Getting Married" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Guest Guide" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Our Special Family · Youyou",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: "View the Complete Guest Guide",
      }),
    ).toHaveAttribute("href", "/guide");
  });
});
