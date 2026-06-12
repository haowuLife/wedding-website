import { expect, test } from "@playwright/test";

test("mobile invitation opens wedding details", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "吴昊 & 王璐" })).toBeVisible();
  await page.getByRole("link", { name: /查看邀请/ }).click();
  await expect(page).toHaveURL(/\/details$/);
  await expect(page.getByRole("heading", { name: "婚礼信息" })).toBeVisible();
});

test("guest can submit RSVP and receive thanks", async ({ page }) => {
  await page.goto("/rsvp");
  await expect(page.getByLabel("携带儿童")).toHaveCount(0);
  await expect(page.getByLabel("饮食忌口")).toHaveCount(0);
  await expect(page.getByLabel("需要停车位")).toHaveCount(0);
  await page.getByLabel("姓名").fill("周清");
  await page.getByLabel("手机号").fill("13800001024");
  await page.getByRole("button", { name: "提交 RSVP" }).click();
  await expect(
    page.getByRole("heading", { name: "谢谢你的回复" }),
  ).toBeVisible();
});

test("guest guide ends with complete transport information", async ({ page }) => {
  await page.goto("/guide");
  await expect(
    page.getByRole("heading", { name: "泰州旅行推荐" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "泰兴美食推荐" }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "交通信息" })).toBeVisible();
  await expect(page.getByText(/扬州泰州国际机场/)).toBeVisible();
  await expect(page.getByText(/很抱歉让大家舟车劳顿/)).toBeVisible();

  const travel = page.getByTestId("travel-section");
  const food = page.getByTestId("food-section");
  const transport = page.getByTestId("transport-section");
  await expect(travel).toBeVisible();
  await expect(food).toBeVisible();
  await expect(transport).toBeVisible();
  expect(
    await travel.evaluate((node, other) =>
      Boolean(node.compareDocumentPosition(other as Node) & Node.DOCUMENT_POSITION_FOLLOWING),
    await food.elementHandle(),
    ),
  ).toBe(true);
  expect(
    await food.evaluate((node, other) =>
      Boolean(node.compareDocumentPosition(other as Node) & Node.DOCUMENT_POSITION_FOLLOWING),
    await transport.elementHandle(),
    ),
  ).toBe(true);
});

test("guestbook explains moderation after submission", async ({ page }) => {
  await page.goto("/guestbook");
  await page.getByLabel("姓名").fill("小满");
  await page.getByLabel("祝福留言").fill("愿你们长长久久，岁岁欢愉。");
  await page.getByRole("button", { name: "送上祝福" }).click();
  await expect(page.getByRole("heading", { name: "祝福已收到" })).toBeVisible();
  await expect(page.getByText(/审核后公开展示/)).toBeVisible();
});

test("gallery filters photos and opens the lightbox", async ({ page }) => {
  await page.goto("/gallery");
  await page.getByRole("button", { name: "筛选山野" }).click();
  await page.getByRole("button", { name: "查看相望" }).click();
  await expect(page.getByRole("dialog", { name: "照片预览" })).toBeVisible();
  await page.getByRole("button", { name: "关闭照片预览" }).click();
  await expect(page.getByRole("dialog", { name: "照片预览" })).toBeHidden();
});

test("memories stay hidden until enabled", async ({ page }) => {
  await page.goto("/memories");
  await expect(page.getByRole("heading", { name: "暂未开放" })).toBeVisible();
});
