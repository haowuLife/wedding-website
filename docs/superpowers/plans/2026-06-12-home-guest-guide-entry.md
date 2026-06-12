# Home Guest Guide Entry Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a prominent guest guide preview to the home scroll and make the wedding details preview accurately describe its target page.

**Architecture:** Extend the existing `HomePreview` data-driven list with explicit button labels and a third guest-guide item. Reuse the established alternating image/text layout and existing local guide imagery, without duplicating full guide content on the home page.

**Tech Stack:** Next.js, React, TypeScript, Tailwind CSS, Next Image, Framer Motion, Vitest, Playwright.

---

### Task 1: Lock the home navigation behavior

**Files:**
- Modify: `tests/home-preview.test.tsx`
- Modify: `e2e/public.spec.ts`

- [ ] **Step 1: Add a failing component test**

Render `HomePreview` and assert:

```tsx
expect(screen.getByRole("link", { name: "查看婚礼信息" })).toHaveAttribute(
  "href",
  "/details",
);
expect(
  screen.getByRole("link", { name: "查看完整宾客指南" }),
).toHaveAttribute("href", "/guide");
```

- [ ] **Step 2: Add a failing browser test**

On `/`, locate “查看完整宾客指南”, click it, and assert navigation to `/guide`.

- [ ] **Step 3: Run focused tests and verify RED**

Run:

```powershell
npm.cmd test -- tests/home-preview.test.tsx
```

Expected: FAIL because the dedicated guide entry and explicit button labels do not exist.

### Task 2: Add the guest guide preview

**Files:**
- Modify: `components/home/home-preview.tsx`

- [ ] **Step 1: Add explicit labels to preview data**

Set the story label to “阅读我们的故事”, wedding details label to “查看婚礼信息”, and add:

```ts
{
  eyebrow: "Guest Guide",
  title: "让这趟相聚更从容",
  description:
    "交通、住宿、天气，以及泰州旅行与泰兴美食推荐，都整理在完整宾客指南中。",
  href: "/guide",
  image: "/images/guide/taixing-ginkgo-forest.webp",
  actionLabel: "查看完整宾客指南",
}
```

- [ ] **Step 2: Render each item label**

Replace the shared “了解更多” text with `preview.actionLabel`.

- [ ] **Step 3: Verify focused tests GREEN**

Run:

```powershell
npm.cmd test -- tests/home-preview.test.tsx
```

Expected: PASS.

### Task 3: Verify responsiveness and delivery

**Files:**
- Modify: `docs/design/implementation-home-mobile.png`
- Modify: `docs/design/implementation-home-desktop.png`

- [ ] **Step 1: Inspect phone and desktop layouts**

Confirm the guest guide preview appears between wedding details and RSVP, image crops cleanly, and the button is visible without using the top navigation.

- [ ] **Step 2: Run full verification**

Run:

```powershell
npm.cmd test
npm.cmd run lint
npm.cmd run typecheck
npm.cmd run build
npm.cmd run test:e2e
git diff --check
```

Expected: every command exits with code 0.

- [ ] **Step 3: Commit and push**

Run:

```powershell
git add -A
git commit -m "feat: surface guest guide on home"
git push origin HEAD:main
```

