import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

describe("public font assets", () => {
  it("self-hosts the script font without build-time Google font downloads", () => {
    const root = process.cwd();
    const layout = readFileSync(join(root, "app/layout.tsx"), "utf8");
    const publicLayout = readFileSync(
      join(root, "app/(public)/layout.tsx"),
      "utf8",
    );
    const styles = readFileSync(join(root, "app/globals.css"), "utf8");
    const scriptFont = readFileSync(
      join(root, "public/fonts/great-vibes-latin.woff2"),
    );

    expect(layout).not.toContain("next/font/google");
    expect(styles).toContain("@font-face");
    expect(styles).toContain("/fonts/great-vibes-latin.woff2");
    expect(publicLayout).toContain('className="public-site"');
    expect(styles).toContain(".public-site .page-heading::after");
    expect(scriptFont.byteLength).toBeGreaterThan(20_000);
  });
});
