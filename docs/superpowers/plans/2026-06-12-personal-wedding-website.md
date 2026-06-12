# Personal Wedding Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-ready, mobile-first wedding invitation website with public storytelling pages, secure RSVP and guestbook collection, Supabase-backed administration, private media, and deployment documentation.

**Architecture:** Use Next.js App Router with Server Components for safe content reads and focused Client Components for motion, forms, menus, and lightboxes. Keep domain validation and security helpers independent from framework route handlers so they can be tested directly. Use a Supabase adapter in production and a deterministic demo repository when environment variables are absent, allowing the complete interface and automated tests to run locally without exposing or inventing credentials.

**Tech Stack:** Next.js, React, TypeScript, Tailwind CSS, Framer Motion, Supabase PostgreSQL/Auth/Storage, Zod, Vitest, React Testing Library, Playwright, Vercel.

---

## File Map

- `app/(public)/*`: public routes and route-specific page composition.
- `app/admin/*`: authenticated management UI.
- `app/api/*`: validated RSVP, guestbook, gallery access, export, and admin upload endpoints.
- `components/layout/*`: navigation, footer, section shells, and providers.
- `components/home/*`: cinematic hero, countdown, and home previews.
- `components/forms/*`: RSVP and guestbook forms.
- `components/gallery/*`: access gate, category filters, grid, and lightbox.
- `components/admin/*`: dashboard, tables, moderation, photo manager, and settings forms.
- `lib/content/*`: default/demo content and typed settings.
- `lib/domain/*`: schemas, phone normalization, countdown, CSV, rate limiting, and access-code logic.
- `lib/supabase/*`: browser/server/admin clients and repository implementations.
- `lib/repositories/*`: interfaces plus demo and Supabase adapters.
- `supabase/migrations/*`: tables, triggers, indexes, RLS, policies, and storage setup.
- `tests/*`: unit and component tests.
- `e2e/*`: critical browser journeys.
- `public/images/*`: project-owned optimized visual assets.

## Task 1: Foundation and Design System

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`
- Create: `app/layout.tsx`, `app/globals.css`, `app/not-found.tsx`
- Create: `components/layout/site-header.tsx`, `components/layout/site-footer.tsx`
- Create: `lib/content/site.ts`, `lib/utils.ts`
- Create: `vitest.config.ts`, `tests/setup.ts`, `tests/site-content.test.ts`
- Create: `.env.example`, `.gitignore`
- Copy: `docs/design/selected-airy-romantic-film.png` to `public/images/hero-wedding.png`

- [ ] **Step 1: Write the failing content contract test**

```ts
import { describe, expect, it } from "vitest";
import { defaultSiteContent } from "@/lib/content/site";

describe("defaultSiteContent", () => {
  it("provides the public navigation and disabled memories state", () => {
    expect(defaultSiteContent.navigation.map((item) => item.href)).toContain("/rsvp");
    expect(defaultSiteContent.memories.enabled).toBe(false);
  });
});
```

- [ ] **Step 2: Run the test and verify it fails because the module is missing**

Run: `npm test -- tests/site-content.test.ts`

- [ ] **Step 3: Implement the typed content model, Next.js shell, fonts, theme tokens, and responsive navigation**

The content model must include identity, hero, wedding, story, guide, gallery,
guestbook, memories, navigation, and music. The navigation sheet must support
Escape, focus states, and body-safe mobile layout.

- [ ] **Step 4: Run unit tests and static checks**

Run: `npm test -- tests/site-content.test.ts`
Run: `npm run typecheck`
Run: `npm run lint`

## Task 2: Public Pages and Cinematic Cover

**Files:**
- Create: `app/(public)/page.tsx`
- Create: `app/(public)/story/page.tsx`
- Create: `app/(public)/details/page.tsx`
- Create: `app/(public)/guide/page.tsx`
- Create: `app/(public)/memories/page.tsx`
- Create: `components/home/cinematic-hero.tsx`
- Create: `components/home/countdown.tsx`
- Create: `components/home/home-preview.tsx`
- Create: `components/motion/reveal.tsx`
- Create: `components/ui/*`
- Test: `tests/countdown.test.ts`, `tests/memories.test.tsx`

- [ ] **Step 1: Write failing tests for countdown calculation and memories visibility**

```ts
it("clamps an elapsed wedding countdown to zero", () => {
  expect(getCountdown(new Date("2026-10-19"), new Date("2026-10-18"))).toEqual({
    days: 0, hours: 0, minutes: 0, seconds: 0,
  });
});
```

- [ ] **Step 2: Run tests and confirm expected missing-function failures**

Run: `npm test -- tests/countdown.test.ts tests/memories.test.tsx`

- [ ] **Step 3: Implement all read-only public pages**

The cover must match the selected mobile reference: full-bleed dawn image,
champagne serif names, date, countdown, invitation CTA, music opt-in, menu, and
scroll cue. Use a 16-second slow zoom and subtle layers; disable decorative
motion with `useReducedMotion`.

- [ ] **Step 4: Verify tests, responsiveness, reduced motion, and production compilation**

Run: `npm test -- tests/countdown.test.ts tests/memories.test.tsx`
Run: `npm run typecheck`
Run: `npm run build`

## Task 3: Supabase Schema and Repository Boundaries

**Files:**
- Create: `supabase/migrations/202606120001_initial_schema.sql`
- Create: `supabase/seed.sql`
- Create: `lib/supabase/client.ts`, `lib/supabase/server.ts`, `lib/supabase/admin.ts`
- Create: `lib/repositories/types.ts`, `lib/repositories/index.ts`
- Create: `lib/repositories/demo-repository.ts`
- Create: `lib/repositories/supabase-repository.ts`
- Create: `lib/domain/env.ts`
- Test: `tests/env.test.ts`, `tests/demo-repository.test.ts`

- [ ] **Step 1: Write failing tests for environment selection and repository privacy**

Tests must prove that missing Supabase variables select demo mode and that demo
public message reads never return unapproved or hidden entries.

- [ ] **Step 2: Run tests and verify they fail for missing adapters**

Run: `npm test -- tests/env.test.ts tests/demo-repository.test.ts`

- [ ] **Step 3: Implement schema and repositories**

SQL must create the required tables plus normalized phone, hidden state,
collection/media type, rate limits, updated-at trigger, indexes, RLS, admin
helper, and private `wedding-media` bucket policies. Public clients must not
read RSVP rows.

- [ ] **Step 4: Verify domain tests and inspect SQL for unsafe grants**

Run: `npm test -- tests/env.test.ts tests/demo-repository.test.ts`
Run: `rg -n "service_role|anon|authenticated|policy|row level security" supabase/migrations`

## Task 4: RSVP and Guestbook

**Files:**
- Create: `lib/domain/rsvp.ts`, `lib/domain/guestbook.ts`
- Create: `lib/domain/anti-spam.ts`, `lib/domain/request.ts`
- Create: `app/api/rsvp/route.ts`, `app/api/guestbook/route.ts`
- Create: `app/(public)/rsvp/page.tsx`, `app/(public)/guestbook/page.tsx`
- Create: `components/forms/rsvp-form.tsx`, `components/forms/guestbook-form.tsx`
- Create: `components/guestbook/message-list.tsx`
- Test: `tests/rsvp.test.ts`, `tests/guestbook.test.ts`, `tests/rsvp-form.test.tsx`

- [ ] **Step 1: Write failing validation and component tests**

Tests must cover normalized Chinese mobile numbers, declining attendance
forcing guest count to zero, text limits, honeypot rejection, pending message
status, form field errors, and thank-you state.

- [ ] **Step 2: Run tests and verify expected failures**

Run: `npm test -- tests/rsvp.test.ts tests/guestbook.test.ts tests/rsvp-form.test.tsx`

- [ ] **Step 3: Implement schemas, request guards, route handlers, and forms**

Both routes validate JSON content type, same-origin headers, honeypot, IP-hash
rate limit, and Zod payloads before repository writes. Responses must not echo
private records.

- [ ] **Step 4: Run focused tests and full static checks**

Run: `npm test -- tests/rsvp.test.ts tests/guestbook.test.ts tests/rsvp-form.test.tsx`
Run: `npm run typecheck`
Run: `npm run lint`

## Task 5: Gallery and Private Media

**Files:**
- Create: `lib/domain/gallery-access.ts`
- Create: `app/(public)/gallery/page.tsx`
- Create: `app/api/gallery/access/route.ts`
- Create: `components/gallery/gallery-experience.tsx`
- Create: `components/gallery/gallery-grid.tsx`
- Create: `components/gallery/gallery-lightbox.tsx`
- Add: gallery demo assets under `public/images/gallery/`
- Test: `tests/gallery-access.test.ts`, `tests/gallery-experience.test.tsx`

- [ ] **Step 1: Write failing tests for access-code verification and category filtering**

Tests must verify timing-safe hash comparison, expiring signed-cookie payloads,
invalid-code errors, public-only photo filtering, category changes, and
lightbox close behavior.

- [ ] **Step 2: Run tests and verify expected failures**

Run: `npm test -- tests/gallery-access.test.ts tests/gallery-experience.test.tsx`

- [ ] **Step 3: Implement the access gate, signed session cookie, gallery, and lightbox**

Private Supabase paths are resolved server-side into short-lived URLs.
Demo mode uses local optimized assets. The lightbox supports swipe, keyboard
arrows, Escape, captions, and focus return.

- [ ] **Step 4: Verify focused tests and image build behavior**

Run: `npm test -- tests/gallery-access.test.ts tests/gallery-experience.test.tsx`
Run: `npm run build`

## Task 6: Authentication and Admin Management

**Files:**
- Create: `middleware.ts`
- Create: `lib/domain/auth.ts`, `lib/domain/csv.ts`
- Create: `app/admin/login/page.tsx`, `app/admin/layout.tsx`, `app/admin/page.tsx`
- Create: `app/admin/guests/page.tsx`, `app/admin/messages/page.tsx`
- Create: `app/admin/photos/page.tsx`, `app/admin/settings/page.tsx`
- Create: `app/api/admin/export/route.ts`
- Create: `app/api/admin/messages/[id]/route.ts`
- Create: `app/api/admin/photos/route.ts`, `app/api/admin/photos/[id]/route.ts`
- Create: `app/api/admin/settings/route.ts`
- Create: `components/admin/*`
- Test: `tests/auth.test.ts`, `tests/csv.test.ts`, `tests/admin-summary.test.ts`

- [ ] **Step 1: Write failing authorization, CSV, and statistics tests**

Tests must cover unauthenticated denial, admin-role acceptance, CSV escaping,
UTF-8 BOM export, attendance filtering, and total attendee calculation.

- [ ] **Step 2: Run tests and verify expected failures**

Run: `npm test -- tests/auth.test.ts tests/csv.test.ts tests/admin-summary.test.ts`

- [ ] **Step 3: Implement the admin shell and all requested management actions**

Demo mode provides a clearly labeled local preview session and in-memory sample
data; production mode uses Supabase Auth. Every mutation repeats server-side
authorization. Uploads enforce image MIME type and size and use UUID paths.

- [ ] **Step 4: Verify focused tests and protected build output**

Run: `npm test -- tests/auth.test.ts tests/csv.test.ts tests/admin-summary.test.ts`
Run: `npm run typecheck`
Run: `npm run build`

## Task 7: Deployment, End-to-End Tests, and Visual QA

**Files:**
- Create: `playwright.config.ts`
- Create: `e2e/public.spec.ts`, `e2e/admin.spec.ts`
- Create: `README.md`, `docs/deployment.md`
- Create: `vercel.json`
- Create: `design-qa.md`
- Modify: project files based on browser and build findings

- [ ] **Step 1: Write critical Playwright journeys**

The tests cover mobile home navigation, RSVP success, guestbook pending state,
gallery filtering/lightbox, hidden memories, and admin login protection.

- [ ] **Step 2: Run Playwright and confirm any missing behavior fails**

Run: `npm run test:e2e`

- [ ] **Step 3: Complete deployment documentation and fix browser findings**

Document Supabase project creation, SQL migration, Auth admin setup, Storage,
environment variables, Vercel deployment, Cloudflare Pages constraints, R2
adapter notes, backups, and post-wedding memories enablement.

- [ ] **Step 4: Run final verification**

Run: `npm test`
Run: `npm run lint`
Run: `npm run typecheck`
Run: `npm run build`
Run: `npm run test:e2e`

- [ ] **Step 5: Run visual QA**

Open the selected reference and the local implementation at `390x844`, compare
the same hero state, fix all P0-P2 differences, and record
`final result: passed` in `design-qa.md`.

