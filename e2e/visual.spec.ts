import { expect, test } from "@playwright/test";

test("captures the mobile home visual baseline", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "吴昊 & 王璐" })).toBeVisible();
  await page.waitForTimeout(1_400);
  await page.screenshot({
    path: "docs/design/implementation-home-mobile.png",
  });
});

test("captures the desktop home visual baseline", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 960 });
  await page.goto("/");
  await expect(page.getByTestId("desktop-navigation")).toBeVisible();
  await expect(page.getByTestId("mobile-menu-button")).toBeHidden();
  await expect(page.getByRole("heading", { name: "吴昊 & 王璐" })).toBeVisible();
  await page.waitForTimeout(1_400);
  await page.screenshot({
    path: "docs/design/implementation-home-desktop.png",
  });
});

test("captures the responsive inner-page visual system", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/guide");
  await expect(
    page.getByRole("heading", { name: "宾客指南", exact: true }),
  ).toBeVisible();
  await page.screenshot({
    path: "docs/design/implementation-guide-mobile.png",
  });

  await page.setViewportSize({ width: 1440, height: 960 });
  await page.goto("/rsvp");
  await expect(
    page.getByRole("heading", { name: "期待你的回复", exact: true }),
  ).toBeVisible();
  await page.screenshot({
    path: "docs/design/implementation-rsvp-desktop.png",
  });
});
