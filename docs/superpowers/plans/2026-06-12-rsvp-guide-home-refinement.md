# RSVP Guide and Home Refinement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Simplify RSVP collection, revise guest guidance, and strengthen home-page title hierarchy without breaking existing Supabase databases.

**Architecture:** Remove the two retired fields from the application-domain contract while retaining the existing PostgreSQL columns for compatibility. Keep parking as the only optional attendance detail, update typed site content for guide copy, and use responsive Tailwind typography changes for the home sections.

**Tech Stack:** Next.js, React, TypeScript, Tailwind CSS, Zod, Supabase, Vitest, Playwright.

---

### Task 1: Simplify the RSVP contract

**Files:**
- Modify: `tests/rsvp.test.ts`
- Modify: `lib/domain/rsvp.ts`
- Modify: `components/forms/rsvp-form.tsx`
- Modify: `app/api/rsvp/route.ts`

- [ ] Write tests proving RSVP accepts payloads without children or dietary fields and still resets guest count and parking when declining.
- [ ] Run `npm.cmd test -- tests/rsvp.test.ts` and confirm the old schema fails.
- [ ] Remove the retired fields from the form payload and Zod schema; keep parking conditional on attendance.
- [ ] Run the focused RSVP test and confirm it passes.

### Task 2: Remove retired fields from admin-domain output

**Files:**
- Modify: `tests/csv.test.ts`
- Modify: `tests/admin-summary.test.ts`
- Modify: `lib/repositories/types.ts`
- Modify: `lib/repositories/demo-repository.ts`
- Modify: `lib/repositories/supabase-repository.ts`
- Modify: `lib/domain/csv.ts`
- Modify: `lib/domain/admin-summary.ts`
- Modify: `app/admin/(dashboard)/guests/page.tsx`
- Modify: `app/admin/(dashboard)/page.tsx`

- [ ] Update tests to require CSV columns for name, phone, attendance, count, parking, message, and timestamp only; remove children statistics.
- [ ] Run the focused tests and confirm the old output fails.
- [ ] Remove retired properties from `Guest` and demo data.
- [ ] Map only active fields from Supabase and write legacy columns as `false`/`null`.
- [ ] Remove retired table columns, dashboard statistics, and CSV values.
- [ ] Run the focused tests and TypeScript check.

### Task 3: Revise guide content and home typography

**Files:**
- Modify: `tests/site-content.test.ts`
- Modify: `lib/content/site.ts`
- Modify: `components/home/home-preview.tsx`
- Modify: `e2e/public.spec.ts`
- Modify: `e2e/visual.spec.ts`

- [ ] Add content assertions for detailed transport, concise parking, and weather-only clothing guidance.
- [ ] Run the site-content test and confirm it fails against the previous copy.
- [ ] Update the guide content and increase the three home-section title sizes responsively.
- [ ] Add an E2E assertion that RSVP omits children and dietary inputs while retaining parking.
- [ ] Regenerate mobile and desktop visual baselines.

### Task 4: Verify and publish

**Files:**
- Update generated screenshots under `docs/design/`

- [ ] Run `npm.cmd test`, `npm.cmd run lint`, and `npm.cmd run typecheck`.
- [ ] Run `npm.cmd run build` and `npm.cmd run test:e2e`.
- [ ] Inspect mobile and desktop screenshots and confirm no clipping or overlap.
- [ ] Commit the scoped changes and push the current branch to `origin/main`.
