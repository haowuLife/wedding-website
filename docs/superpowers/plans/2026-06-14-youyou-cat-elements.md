# Youyou Cat Elements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Youyou as a family member on the home page and as a wedding guide on RSVP and Guest Guide pages, with an accessible one-paw click animation.

**Architecture:** Create one client component that owns the avatar button and paw animation, with `family` and `steward` visual variants. Keep all bilingual copy in `PublicMessages`, and let server pages select the appropriate variant and context. Store one real Youyou photo under `public/images/youyou/` so runtime rendering never depends on attachment paths.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind CSS, Framer Motion, Vitest, Testing Library, Playwright

---

### Task 1: Add Bilingual Youyou Copy

**Files:**
- Modify: `lib/i18n/messages.ts`
- Modify: `tests/messages.test.ts`

- [ ] **Step 1: Write the failing message test**

Add assertions that Chinese and English messages expose:

```ts
expect(zh.youyou.familyTitle).toBe("我们的特别家人 · 呦呦");
expect(zh.youyou.welcome).toBe("欢迎参加吴昊和王璐的婚礼！");
expect(en.youyou.familyTitle).toBe("Our Special Family · Youyou");
expect(en.youyou.welcome).toBe(
  "Welcome to Hao Wu and Lu Wang's wedding!",
);
```

- [ ] **Step 2: Run the test and verify RED**

Run: `npm.cmd test -- tests/messages.test.ts`

Expected: FAIL because `youyou` is not defined on `PublicMessages`.

- [ ] **Step 3: Add the typed bilingual message block**

Add `youyou` to `PublicMessages` with image alt text, avatar action label, family copy, steward title, welcome message, RSVP description, and guide description. Populate both locales with the approved copy.

- [ ] **Step 4: Run the test and verify GREEN**

Run: `npm.cmd test -- tests/messages.test.ts`

Expected: PASS.

### Task 2: Build the Paw Interaction Component

**Files:**
- Create: `components/youyou/youyou-card.tsx`
- Create: `tests/youyou-card.test.tsx`
- Add: `public/images/youyou/youyou-portrait.jpg`

- [ ] **Step 1: Write failing component tests**

Cover:

```tsx
render(<YouyouCard variant="family" messages={messages} />);
expect(screen.getByRole("heading", { name: messages.familyTitle })).toBeVisible();
expect(screen.queryByTestId("youyou-paw-stamp")).not.toBeInTheDocument();
await user.click(screen.getByRole("button", { name: messages.avatarActionLabel }));
expect(screen.getByTestId("youyou-paw-stamp")).toBeVisible();
```

Also render `variant="steward"` and assert the approved welcome text is present.

- [ ] **Step 2: Run the test and verify RED**

Run: `npm.cmd test -- tests/youyou-card.test.tsx`

Expected: FAIL because the component does not exist.

- [ ] **Step 3: Implement the minimal component**

Implement:

- `family` and `steward` variants.
- A real `next/image` avatar button.
- One keyed Framer Motion paw SVG near the avatar.
- A 1.5 second timer that clears the stamp.
- Restart behavior on repeated clicks without accumulating paw elements.
- `useReducedMotion()` fallback with opacity-only animation.
- Keyboard activation through a native button.

- [ ] **Step 4: Run the component test and verify GREEN**

Run: `npm.cmd test -- tests/youyou-card.test.tsx`

Expected: PASS.

### Task 3: Integrate the Cards Into Public Pages

**Files:**
- Modify: `components/home/home-preview.tsx`
- Modify: `app/(public)/page.tsx`
- Modify: `app/(public)/rsvp/page.tsx`
- Modify: `app/(public)/guide/page.tsx`
- Modify: `tests/home-preview.test.tsx`

- [ ] **Step 1: Add failing integration assertions**

Update `HomePreview` tests to pass Youyou messages and assert the family heading and avatar action are present after the invitation section.

- [ ] **Step 2: Run the integration test and verify RED**

Run: `npm.cmd test -- tests/home-preview.test.tsx`

Expected: FAIL because the family card is not rendered.

- [ ] **Step 3: Add the page integrations**

- Pass `messages.youyou` from the home page to `HomePreview`.
- Render `YouyouCard variant="family"` between the invitation introduction and preview list.
- Render `YouyouCard variant="steward" context="rsvp"` above the RSVP form.
- Render `YouyouCard variant="steward" context="guide"` above the guide information grid.
- Keep every card in normal document flow with mobile-first spacing.

- [ ] **Step 4: Run focused tests and verify GREEN**

Run:

```powershell
npm.cmd test -- tests/home-preview.test.tsx tests/youyou-card.test.tsx tests/messages.test.ts
```

Expected: PASS.

### Task 4: Verify Locale, Interaction, and Responsive Layout

**Files:**
- Modify: `e2e/public.spec.ts`
- Modify: `e2e/locale.spec.ts`
- Modify: `e2e/modern-romantic-ui.spec.ts`

- [ ] **Step 1: Add browser assertions**

Add scenarios that verify:

- Chinese home displays `我们的特别家人 · 呦呦`.
- Clicking the avatar shows exactly one `youyou-paw-stamp`.
- RSVP and Guide display `欢迎参加吴昊和王璐的婚礼！`.
- English pages display the approved English family and welcome copy.
- `/`, `/rsvp`, and `/guide` remain free of horizontal overflow at 320px.

- [ ] **Step 2: Run focused E2E and verify behavior**

Run:

```powershell
npx.cmd playwright test e2e/public.spec.ts e2e/locale.spec.ts e2e/modern-romantic-ui.spec.ts
```

Expected: PASS.

- [ ] **Step 3: Run full verification**

Run:

```powershell
npm.cmd test -- --run
npm.cmd run typecheck
npm.cmd run lint
npm.cmd run test:e2e
npm.cmd run build
```

Expected: all commands exit with code 0.
