import { expect, test } from "@playwright/test";

test("demo admin exposes the protected dashboard preview", async ({ page }) => {
  await page.goto("/admin/login");
  await expect(page.getByText(/本地演示模式/)).toBeVisible();
  await page.getByRole("link", { name: "进入演示后台" }).click();
  await expect(page).toHaveURL(/\/admin$/);
  await expect(page.getByRole("heading", { name: "婚礼概览" })).toBeVisible();
  await expect(page.getByText(/参加总人数/)).toBeVisible();
});
