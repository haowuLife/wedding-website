import { expect, test } from "@playwright/test";

test("captures the mobile home visual baseline", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "陈屿 & 林晚" })).toBeVisible();
  await page.waitForTimeout(1_400);
  await page.screenshot({
    path: "docs/design/implementation-home-mobile.png",
  });
});
