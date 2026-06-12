# Guest Guide Travel, Food, and Transport Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand the guest guide with image-led Taizhou travel and Taixing food recommendations, move transport to the bottom, and remove parking collection from RSVP and administration.

**Architecture:** Add typed travel, food, and transport collections to `SiteContent` and render them through focused guide components. Keep legacy Supabase parking columns for schema compatibility, but remove parking from the application contract and write `false` on upsert.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS, Next Image, Vitest, Playwright, Supabase.

---

### Task 1: Lock the content and RSVP contracts with failing tests

**Files:**
- Modify: `tests/site-content.test.ts`
- Modify: `tests/rsvp.test.ts`
- Modify: `tests/csv.test.ts`
- Modify: `tests/admin-summary.test.ts`
- Modify: `e2e/public.spec.ts`

- [ ] **Step 1: Add failing guide content assertions**

Assert that travel contains 泰兴国家古银杏森林公园、溱湖国家湿地公园、凤城河与望海楼; food contains 黄桥烧饼、宣堡小馄饨、曲霞汤包; transport contains 泰州站、扬州泰州国际机场、泰兴汽车客运站和自驾; 黄桥古镇 is absent; and the holiday message expresses apology and thanks.

- [ ] **Step 2: Add failing RSVP and admin assertions**

Remove `needParking` from test fixtures and expected results. Assert the RSVP schema output, CSV headers, and admin summary no longer contain parking information.

- [ ] **Step 3: Update the browser flow expectation**

Assert the RSVP page has no “需要停车位” field and the guide shows the transport section after travel and food.

- [ ] **Step 4: Run focused tests and verify RED**

Run:

```powershell
npm.cmd test -- tests/site-content.test.ts tests/rsvp.test.ts tests/csv.test.ts tests/admin-summary.test.ts
```

Expected: failures because travel, food, and transport collections do not exist and parking is still part of the application contract.

### Task 2: Add structured guide content

**Files:**
- Modify: `lib/content/site.ts`
- Modify: `lib/content/settings.ts`
- Create: `docs/image-sources.md`
- Create: `public/images/guide/*.webp`

- [ ] **Step 1: Add typed recommendation structures**

Define `RecommendationItem` with `title`, `description`, `image`, optional `meta`, and optional `action`. Define `TransportItem` with `title`, `description`, and optional `action`. Add `travel`, `food`, `transport`, and `holidayTravelNote` to `SiteContent`.

- [ ] **Step 2: Add the confirmed content**

Use the approved three travel entries, three food entries, four transport entries, dynamic-price disclaimer, and the exact holiday apology copy. Put transport details in a dedicated collection rather than the legacy `guide` array.

- [ ] **Step 3: Add optimized local images**

Store six responsive WebP images under `public/images/guide/`, keep each image appropriately compressed, and document source or generation details in `docs/image-sources.md`.

- [ ] **Step 4: Preserve settings compatibility**

Continue merging legacy `site.guide` settings for the basic guide items while leaving travel, food, transport, and the holiday note on their new defaults.

- [ ] **Step 5: Run the guide content test and verify GREEN**

Run:

```powershell
npm.cmd test -- tests/site-content.test.ts
```

Expected: all guide content assertions pass.

### Task 3: Remove parking from RSVP and administration

**Files:**
- Modify: `components/forms/rsvp-form.tsx`
- Modify: `lib/domain/rsvp.ts`
- Modify: `app/api/rsvp/route.ts`
- Modify: `lib/repositories/types.ts`
- Modify: `lib/repositories/demo-repository.ts`
- Modify: `lib/repositories/supabase-repository.ts`
- Modify: `lib/domain/csv.ts`
- Modify: `lib/domain/admin-summary.ts`
- Modify: `app/admin/(dashboard)/guests/page.tsx`
- Modify: `app/admin/(dashboard)/page.tsx`

- [ ] **Step 1: Remove the field from the public flow**

Delete the parking checkbox, payload property, Zod property, and API mapping.

- [ ] **Step 2: Remove the field from the application model**

Delete `needParking` from `Guest` and demo data. Stop reading it in `mapGuest`.

- [ ] **Step 3: Keep database compatibility**

Continue writing `need_parking: false` in Supabase upserts without exposing the property through `GuestInput`.

- [ ] **Step 4: Remove parking from administration**

Delete the CSV column, summary property, dashboard preparation block, and guest table column.

- [ ] **Step 5: Run focused tests and verify GREEN**

Run:

```powershell
npm.cmd test -- tests/rsvp.test.ts tests/csv.test.ts tests/admin-summary.test.ts
```

Expected: all RSVP and administration tests pass.

### Task 4: Build the responsive guest guide

**Files:**
- Create: `components/guide/recommendation-section.tsx`
- Create: `components/guide/transport-section.tsx`
- Modify: `app/(public)/guide/page.tsx`

- [ ] **Step 1: Build recommendation cards**

Render an editorial image card with a `4:3` image, eyebrow/meta label, serif title, concise description, and optional link. Use one column on phones and three columns from desktop widths.

- [ ] **Step 2: Build the bottom transport section**

Render transport routes as a mobile-friendly list with icons and a separate champagne-tinted holiday apology card. Include a navigation button for self-driving.

- [ ] **Step 3: Recompose the page**

Render the title, basic guidance, travel recommendations, food recommendations, then transport last. Remove array-index-based icon selection.

- [ ] **Step 4: Run lint and typecheck**

Run:

```powershell
npm.cmd run lint
npm.cmd run typecheck
```

Expected: both commands exit with code 0.

### Task 5: Browser verification and final delivery

**Files:**
- Modify: `docs/design/implementation-guide-mobile.png`
- Modify: `docs/design/implementation-guide-desktop.png`

- [ ] **Step 1: Run browser tests**

Run:

```powershell
npm.cmd run test:e2e
```

Expected: RSVP and guest guide browser flows pass.

- [ ] **Step 2: Inspect mobile and desktop layouts**

Check the guide at phone and desktop widths. Verify image crops, card spacing, Chinese wrapping, ticket labels, the order of sections, and that transport is the final section.

- [ ] **Step 3: Run the full verification suite**

Run:

```powershell
npm.cmd test
npm.cmd run lint
npm.cmd run typecheck
npm.cmd run build
git diff --check
```

Expected: all commands exit with code 0.

- [ ] **Step 4: Commit and push**

Commit the implementation with:

```powershell
git add -A
git commit -m "feat: expand guest travel guide"
git push origin HEAD:main
```

