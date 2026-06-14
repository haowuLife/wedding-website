import { expect, test } from "@playwright/test";

test("modern romantic shell adapts between mobile and desktop", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  await expect(page.getByTestId("mobile-menu-button")).toBeVisible();
  await expect(page.getByTestId("desktop-navigation")).toBeHidden();
  await expect(page.getByText("SAVE THE DATE", { exact: true })).toBeVisible();

  await page.setViewportSize({ width: 1440, height: 960 });
  await page.reload();

  await expect(page.getByTestId("desktop-navigation")).toBeVisible();
  await expect(page.getByTestId("mobile-menu-button")).toBeHidden();
  await expect(page.getByTestId("hero-invitation-card")).toBeVisible();
});

test("public pages avoid horizontal overflow at narrow mobile width", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 800 });

  for (const path of ["/", "/story", "/details", "/guide", "/rsvp"]) {
    await page.goto(path);

    const layout = await page.evaluate((currentPath) => {
      const homeLink = document.querySelector<HTMLAnchorElement>(
        'header[data-site-header] a[href="/"]',
      );
      const languageSwitcher = document.querySelector<HTMLElement>(
        '[data-testid="language-switcher"]',
      );

      return {
        document: document.documentElement.scrollWidth,
        viewport: document.documentElement.clientWidth,
        headerGap:
          currentPath === "/" && homeLink && languageSwitcher
            ? languageSwitcher.getBoundingClientRect().left -
              homeLink.getBoundingClientRect().right
            : null,
      };
    }, path);

    expect(layout.document, `${path} should fit the viewport`).toBeLessThanOrEqual(
      layout.viewport,
    );
    if (layout.headerGap !== null) {
      expect(layout.headerGap, "home header controls should not overlap").toBeGreaterThanOrEqual(
        4,
      );
    }

    if (path === "/") {
      await expect(page.getByTestId("youyou-family-card")).toBeVisible();
    }
    if (path === "/guide") {
      await expect(page.getByTestId("youyou-guide-steward")).toBeVisible();
    }
    if (path === "/rsvp") {
      await expect(page.getByTestId("youyou-rsvp-steward")).toBeVisible();
    }
  }
});
