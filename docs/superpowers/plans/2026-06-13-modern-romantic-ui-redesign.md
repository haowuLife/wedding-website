# Modern Romantic Public UI Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle every public wedding page with the confirmed modern-romantic visual system while preserving all existing bilingual, RSVP, guestbook, gallery, privacy, and admin behavior.

**Architecture:** Keep the current route and component architecture. Introduce the new visual language through global tokens, font variables, reusable public-layout treatments, and scoped component class changes. Four disjoint implementation areas can be developed in parallel: global shell, home, information pages, and interactive pages.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, Framer Motion, Phosphor Icons, Vitest, Testing Library, Playwright.

---

## File Ownership Map

Parallel workers must not edit files outside their assigned set.

- Worker A, global shell:
  - `app/layout.tsx`
  - `app/globals.css`
  - `components/layout/couple-signature.tsx`
  - `components/layout/site-header.tsx`
  - `components/layout/site-footer.tsx`
  - `components/i18n/language-switcher.tsx`
  - `components/motion/reveal.tsx`
  - `tests/couple-signature.test.tsx`
- Worker B, home:
  - `components/home/cinematic-hero.tsx`
  - `components/home/countdown.tsx`
  - `components/home/home-preview.tsx`
  - `tests/home-preview.test.tsx`
  - `tests/countdown-view.test.tsx`
- Worker C, information pages:
  - `app/(public)/story/page.tsx`
  - `app/(public)/details/page.tsx`
  - `app/(public)/guide/page.tsx`
  - `components/guide/recommendation-section.tsx`
  - `components/guide/transport-section.tsx`
- Worker D, interactive pages:
  - `app/(public)/rsvp/page.tsx`
  - `app/(public)/guestbook/page.tsx`
  - `app/(public)/gallery/page.tsx`
  - `app/(public)/memories/page.tsx`
  - `components/forms/rsvp-form.tsx`
  - `components/forms/guestbook-form.tsx`
  - `components/gallery/gallery-access-gate.tsx`
  - `components/gallery/gallery-experience.tsx`
  - `components/gallery/gallery-grid.tsx`
  - `components/gallery/gallery-lightbox.tsx`
  - `components/guestbook/message-list.tsx`
  - `tests/rsvp-form.test.tsx`
  - `tests/guestbook-form.test.tsx`
  - `tests/gallery-experience.test.tsx`
- Integration owner:
  - `e2e/modern-romantic-ui.spec.ts`
  - `e2e/visual.spec.ts`
  - `design-qa.md`
  - any conflict-only edits after worker review

## Task 1: Global Romantic Theme and Public Shell

**Files:**
- Create: `components/layout/couple-signature.tsx`
- Create: `tests/couple-signature.test.tsx`
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`
- Modify: `components/layout/site-header.tsx`
- Modify: `components/layout/site-footer.tsx`
- Modify: `components/i18n/language-switcher.tsx`
- Modify: `components/motion/reveal.tsx`

- [ ] **Step 1: Write the failing couple-signature test**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CoupleSignature } from "@/components/layout/couple-signature";

describe("CoupleSignature", () => {
  it("keeps the localized title readable and renders the romantic signature", () => {
    render(
      <CoupleSignature
        title="吴昊 & 王璐"
        signature="Hao Wu & Lu Wang"
      />,
    );

    expect(screen.getByText("吴昊 & 王璐")).toBeVisible();
    expect(screen.getByText("Hao Wu & Lu Wang")).toHaveClass("font-script");
  });
});
```

- [ ] **Step 2: Run the test and verify RED**

Run:

```powershell
npm.cmd test -- --run tests/couple-signature.test.tsx
```

Expected: FAIL because `CoupleSignature` does not exist.

- [ ] **Step 3: Add font variables and the new color tokens**

Use `next/font/google` in `app/layout.tsx`:

```tsx
import { Great_Vibes, Noto_Sans_SC, Noto_Serif_SC } from "next/font/google";

const serif = Noto_Serif_SC({
  subsets: ["latin"],
  variable: "--font-romantic-serif",
  display: "swap",
});
const sans = Noto_Sans_SC({
  subsets: ["latin"],
  variable: "--font-romantic-sans",
  display: "swap",
});
const script = Great_Vibes({
  subsets: ["latin"],
  variable: "--font-romantic-script",
  weight: "400",
  display: "swap",
});
```

Apply all three variables to `<body>`. Set the theme color to `#fffaf5`.

Replace the public palette in `app/globals.css` with:

```css
:root {
  --color-ivory: #fffaf5;
  --color-ivory-deep: #fff0ef;
  --color-surface: #ffffff;
  --color-coral: #ef7779;
  --color-coral-dark: #b94f53;
  --color-champagne: var(--color-coral);
  --color-champagne-light: #f6a4a5;
  --color-line: rgb(200 95 98 / 18%);
  --color-ink: #332b29;
  --color-muted: #7c6f6a;
  --font-serif: var(--font-romantic-serif), "Songti SC", serif;
  --font-sans: var(--font-romantic-sans), "PingFang SC", sans-serif;
  --font-script: var(--font-romantic-script), cursive;
}

.font-script {
  font-family: var(--font-script);
}

.romantic-card {
  border: 1px solid var(--color-line);
  border-radius: 1.25rem;
  background: rgb(255 255 255 / 92%);
  box-shadow: 0 1.25rem 3.75rem rgb(95 60 55 / 10%);
}

.page-heading::after {
  display: block;
  width: 3.5rem;
  height: 2px;
  margin: 1.5rem auto 0;
  background: var(--color-coral);
  content: "";
}
```

Keep existing semantic utility classes but update their colors and spacing to the
specification.

- [ ] **Step 4: Implement CoupleSignature**

```tsx
export function CoupleSignature({
  title,
  signature,
  compact = false,
}: {
  title: string;
  signature: string;
  compact?: boolean;
}) {
  return (
    <span className="inline-flex flex-col leading-none">
      <span className={compact ? "font-serif text-base" : "font-serif text-lg"}>
        {title}
      </span>
      <span
        className={`font-script text-[var(--color-coral)] ${
          compact ? "text-lg" : "text-2xl"
        }`}
      >
        {signature}
      </span>
    </span>
  );
}
```

- [ ] **Step 5: Restyle header, mobile drawer, switcher, footer, and Reveal**

Header requirements:

- fixed white surface with blush border
- compact couple signature on the left
- centered desktop navigation
- active route coral underline
- mobile shows only signature, language switcher, and menu
- drawer remains keyboard accessible

Footer requirements:

- white surface, blush top border
- localized title plus English signature
- coral RSVP and guestbook links
- quiet admin link

Change Reveal from `y: 24`, `duration: 0.8` to `y: 16`,
`duration: 0.65`.

- [ ] **Step 6: Run focused and full checks**

```powershell
npm.cmd test -- --run tests/couple-signature.test.tsx tests/language-switcher.test.tsx
npm.cmd run typecheck
npm.cmd run lint
```

Expected: all pass.

- [ ] **Step 7: Commit**

```powershell
git add app/layout.tsx app/globals.css components/layout components/i18n/language-switcher.tsx components/motion/reveal.tsx tests/couple-signature.test.tsx
git commit -m "feat: add modern romantic public shell"
```

## Task 2: Modern Romantic Home Page

**Files:**
- Modify: `components/home/cinematic-hero.tsx`
- Modify: `components/home/countdown.tsx`
- Modify: `components/home/home-preview.tsx`
- Modify: `tests/home-preview.test.tsx`
- Modify: `tests/countdown-view.test.tsx`

- [ ] **Step 1: Extend the existing tests before implementation**

Add assertions that the home preview retains the complete guest-guide link and
that Countdown still exposes its localized aria label. Add one new assertion
for the hero-independent invitation structure:

```tsx
expect(screen.getByRole("link", { name: "查看完整宾客指南" })).toBeVisible();
expect(screen.getByLabelText("婚礼倒计时")).toBeVisible();
```

Run the tests first. If the assertions already pass, add a structural assertion
for the new class contract:

```tsx
expect(screen.getByTestId("home-preview")).toHaveClass("modern-romantic-home");
```

Expected: FAIL until the redesigned wrapper is added.

- [ ] **Step 2: Rebuild CinematicHero**

The hero must:

- start below the white header
- use the existing hero image and slow Framer Motion scale
- position a translucent `romantic-card` at lower left on desktop
- place the card below faces on mobile
- show localized primary names and the opposite-language signature
- show date, city, `SAVE THE DATE`, countdown, and coral button
- include a circular coral down control

Do not add a new content field for `SAVE THE DATE`; it is a decorative phrase
and remains identical in both languages.

- [ ] **Step 3: Restyle Countdown**

Use coral separators, serif numerals, and compact labels. Preserve the existing
interval and localization behavior.

- [ ] **Step 4: Restyle HomePreview**

Add:

```tsx
<div
  id="invitation"
  data-testid="home-preview"
  className="modern-romantic-home"
>
```

Use:

- centered invitation section
- white-space-heavy alternating image/copy previews
- rounded image corners
- coral links and short divider
- blush RSVP close

- [ ] **Step 5: Verify**

```powershell
npm.cmd test -- --run tests/home-preview.test.tsx tests/countdown-view.test.tsx
npm.cmd run typecheck
npm.cmd run lint
```

- [ ] **Step 6: Commit**

```powershell
git add components/home tests/home-preview.test.tsx tests/countdown-view.test.tsx
git commit -m "feat: redesign modern romantic home"
```

## Task 3: Story, Details, and Guest Guide

**Files:**
- Modify: `app/(public)/story/page.tsx`
- Modify: `app/(public)/details/page.tsx`
- Modify: `app/(public)/guide/page.tsx`
- Modify: `components/guide/recommendation-section.tsx`
- Modify: `components/guide/transport-section.tsx`

- [ ] **Step 1: Establish shared inner-page structure**

For each page, retain metadata and data loading. Replace its header with:

```tsx
<header className="mx-auto max-w-3xl text-center">
  <p className="eyebrow">{messages.eyebrow}</p>
  <h1 className="page-heading display-title mt-5">{messages.title}</h1>
  {/* existing introduction when present */}
</header>
```

- [ ] **Step 2: Restyle story timeline**

- coral line and dots
- rounded photographs
- white text cards on mobile
- alternating layout on desktop
- no content or ordering changes

- [ ] **Step 3: Restyle wedding details**

- convert summary into three `romantic-card` blocks
- retain date, luncheon, venue values
- use coral primary/outline buttons
- use coral timeline times and blush row separators

- [ ] **Step 4: Restyle guest guide**

- guide basics become three white cards
- recommendation cards use rounded images and white bodies
- transport remains after travel and food
- holiday apology becomes a blush `romantic-card`
- preserve `travel-section`, `food-section`, and `transport-section` test IDs

- [ ] **Step 5: Verify**

```powershell
npm.cmd test -- --run tests/site-content.test.ts e2e/public.spec.ts
npm.cmd run typecheck
npm.cmd run lint
```

If running a Playwright file alone starts a server conflict, run the unit,
typecheck, and lint commands here and leave E2E to integration.

- [ ] **Step 6: Commit**

```powershell
git add 'app/(public)/story/page.tsx' 'app/(public)/details/page.tsx' 'app/(public)/guide/page.tsx' components/guide
git commit -m "feat: redesign wedding information pages"
```

## Task 4: Forms, Gallery, Guestbook, and Memories

**Files:**
- Modify all files listed under Worker D ownership.

- [ ] **Step 1: Add failing class-contract assertions**

In the existing component tests add:

```tsx
expect(screen.getByRole("button", { name: "提交 RSVP" })).toHaveClass(
  "romantic-primary-button",
);
expect(screen.getByRole("button", { name: "送上祝福" })).toHaveClass(
  "romantic-primary-button",
);
expect(screen.getByLabelText("照片分类")).toHaveClass(
  "romantic-filter-bar",
);
```

Run:

```powershell
npm.cmd test -- --run tests/rsvp-form.test.tsx tests/guestbook-form.test.tsx tests/gallery-experience.test.tsx
```

Expected: FAIL on the new class contracts.

- [ ] **Step 2: Restyle RSVP and guestbook**

- wrap forms in white cards at page level
- use coral selected attendance controls
- use coral focus and submit states
- retain all labels, request payloads, success messages, and spam fields
- style approved guestbook messages as white bordered cards

- [ ] **Step 3: Restyle gallery**

- add `romantic-filter-bar` to the category container
- coral filter pills
- rounded masonry images
- warm dark hover overlay
- preserve all lightbox labels, keyboard behavior, and swipe behavior
- restyle access gate as a centered romantic card

- [ ] **Step 4: Restyle memories**

- shared page heading
- videos in white rounded cards
- reuse redesigned GalleryExperience
- retain feature flag and not-found behavior

- [ ] **Step 5: Verify**

```powershell
npm.cmd test -- --run tests/rsvp-form.test.tsx tests/guestbook-form.test.tsx tests/gallery-experience.test.tsx
npm.cmd run typecheck
npm.cmd run lint
```

- [ ] **Step 6: Commit**

```powershell
git add 'app/(public)/rsvp/page.tsx' 'app/(public)/guestbook/page.tsx' 'app/(public)/gallery/page.tsx' 'app/(public)/memories/page.tsx' components/forms components/gallery components/guestbook tests/rsvp-form.test.tsx tests/guestbook-form.test.tsx tests/gallery-experience.test.tsx
git commit -m "feat: redesign interactive wedding pages"
```

## Task 5: Integration, Responsive Coverage, and Visual QA

**Files:**
- Create: `e2e/modern-romantic-ui.spec.ts`
- Modify: `e2e/visual.spec.ts`
- Create: `design-qa.md`
- Modify only conflict-affected implementation files when necessary.

- [ ] **Step 1: Add responsive structural E2E coverage**

Create:

```ts
import { expect, test } from "@playwright/test";

test("modern romantic shell adapts between mobile and desktop", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.getByTestId("mobile-menu-button")).toBeVisible();
  await expect(page.getByTestId("desktop-navigation")).toBeHidden();
  await expect(page.getByText("SAVE THE DATE")).toBeVisible();

  await page.setViewportSize({ width: 1440, height: 960 });
  await page.reload();
  await expect(page.getByTestId("desktop-navigation")).toBeVisible();
  await expect(page.getByTestId("mobile-menu-button")).toBeHidden();
  await expect(page.getByTestId("hero-invitation-card")).toBeVisible();
});
```

Add `data-testid="hero-invitation-card"` during conflict integration if Worker B
did not include it.

- [ ] **Step 2: Run complete automated verification**

```powershell
npm.cmd test -- --run
npm.cmd run typecheck
npm.cmd run lint
npm.cmd run build
npm.cmd run test:e2e
```

Expected:

- all Vitest files pass
- TypeScript exits 0
- ESLint exits 0
- Next production build exits 0
- all Playwright tests pass

- [ ] **Step 3: Run browser visual checks**

Use the in-app browser at:

```text
http://127.0.0.1:3000/
```

Check:

- widths 320, 390, 768, 1024, and 1440
- no horizontal overflow
- header controls fit at 320
- hero card does not cover either face
- English signature font loads
- all public pages use coral headings and warm-white surfaces
- guide transport remains below travel and food

- [ ] **Step 4: Complete design QA**

Create `design-qa.md` containing:

```markdown
# Design QA

Source: supplied wedding-template screenshot and approved B/A direction.
Prototype: local public website.

## P0

None.

## P1

None.

## P2

None.

## P3

List only optional polish not required for handoff.

final result: passed
```

Do not mark passed until P0, P1, and P2 issues have been fixed and the mobile
and desktop screenshots have been reviewed.

- [ ] **Step 5: Request final code review**

Review the complete diff from `ee31d0b` to `HEAD` against:

```text
docs/superpowers/specs/2026-06-13-modern-romantic-ui-redesign.md
```

Fix all critical and important findings, then rerun the complete verification.

- [ ] **Step 6: Commit and push**

```powershell
git add e2e/modern-romantic-ui.spec.ts e2e/visual.spec.ts design-qa.md
git commit -m "test: verify modern romantic redesign"
git push origin HEAD:main
```

