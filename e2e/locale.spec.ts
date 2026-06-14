import { expect, test } from "@playwright/test";

test("public pages switch between Chinese and English on the same URLs", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByTestId("language-switcher")
    .getByRole("button", { name: "EN", exact: true })
    .click();

  await expect(
    page.getByRole("heading", { name: "Hao Wu & Lu Wang" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Our Special Family · Youyou" }),
  ).toBeVisible();
  await expect(page).toHaveURL("/");
  await page.getByTestId("mobile-menu-button").click();
  await expect(
    page
      .getByRole("dialog", { name: "Mobile navigation" })
      .getByRole("link", { name: /^Guest Guide/ }),
  ).toBeVisible();

  await page.goto("/guide");
  await expect(
    page.getByRole("heading", { name: "Guest Guide", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText("Yangzhou Taizhou International Airport"),
  ).toBeVisible();
  await expect(
    page.getByText("Welcome to Hao Wu and Lu Wang's wedding!"),
  ).toBeVisible();

  await page.goto("/rsvp");
  await expect(page.getByLabel("Name")).toBeVisible();
  await expect(
    page.getByText("Welcome to Hao Wu and Lu Wang's wedding!"),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Submit RSVP" }),
  ).toBeVisible();

  await page
    .getByTestId("language-switcher")
    .getByRole("button", { name: "中文", exact: true })
    .click();
  await expect(page.getByLabel("姓名")).toBeVisible();
  await expect(page).toHaveURL("/rsvp");
});
