# Public Bilingual Content Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a Chinese/English session language switch to every public page, while allowing administrators to maintain both language versions without changing public URLs.

**Architecture:** A server-readable session cookie selects `zh` or `en`. Editable wedding content is represented by one `SiteContent` per locale and merged with locale-specific `site_settings` keys, while fixed interface labels live in a typed UI dictionary. Public server pages resolve locale and content before rendering; client forms receive the locale or translated labels as props. Existing Chinese keys and media records remain compatible.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind CSS, Vitest, Testing Library, Playwright, Supabase/PostgreSQL.

---

## File Structure

### Locale infrastructure

- Create `lib/i18n/locale.ts`: locale type, cookie constants, parsing, server locale reader.
- Create `lib/i18n/messages.ts`: typed static UI dictionaries for Chinese and English.
- Create `app/api/locale/route.ts`: same-origin session-cookie language switch.
- Create `components/i18n/language-switcher.tsx`: segmented `中文 / EN` control.
- Create `components/i18n/document-locale.tsx`: synchronize the document language attribute.

### Localized content

- Modify `lib/content/site.ts`: export Chinese and English default `SiteContent`.
- Modify `lib/content/settings.ts`: merge shared, Chinese, and `.en` settings separately.
- Modify all public pages and public components to accept or resolve locale-specific content and labels.

### Administration

- Modify `components/admin/settings-form.tsx`: Chinese/English tabs plus shared settings.
- Modify `app/admin/(dashboard)/settings/page.tsx`: load both locale contents.
- Modify `app/api/admin/settings/route.ts`: accept the new locale-specific setting keys.

### Photos

- Create `supabase/migrations/202606130001_add_photo_translations.sql`.
- Modify repository photo types and mappings for `titleEn` and `descriptionEn`.
- Modify photo APIs and admin manager to create and update both languages.
- Modify public gallery service/components to select localized display text.

### Tests

- Add locale, message, switcher, bilingual settings, and photo localization tests.
- Expand public Playwright coverage for session behavior, navigation, forms, and responsive layout.

---

### Task 1: Locale Session Foundation

**Files:**
- Create: `lib/i18n/locale.ts`
- Create: `app/api/locale/route.ts`
- Test: `tests/locale.test.ts`
- Test: `tests/locale-route.test.ts`

- [ ] **Step 1: Write failing locale parsing tests**

```ts
import { describe, expect, it } from "vitest";
import { parseLocale } from "@/lib/i18n/locale";

describe("parseLocale", () => {
  it("defaults missing and invalid values to Chinese", () => {
    expect(parseLocale(undefined)).toBe("zh");
    expect(parseLocale("fr")).toBe("zh");
  });

  it("accepts the supported locales", () => {
    expect(parseLocale("zh")).toBe("zh");
    expect(parseLocale("en")).toBe("en");
  });
});
```

- [ ] **Step 2: Run the locale test and verify RED**

Run: `npm.cmd test -- tests/locale.test.ts`

Expected: FAIL because `@/lib/i18n/locale` does not exist.

- [ ] **Step 3: Implement locale parsing and server reading**

```ts
import { cookies } from "next/headers";

export const localeCookieName = "wedding_locale";
export type Locale = "zh" | "en";

export function parseLocale(value: string | undefined): Locale {
  return value === "en" ? "en" : "zh";
}

export async function getLocale(): Promise<Locale> {
  const store = await cookies();
  return parseLocale(store.get(localeCookieName)?.value);
}
```

- [ ] **Step 4: Run the locale test and verify GREEN**

Run: `npm.cmd test -- tests/locale.test.ts`

Expected: PASS.

- [ ] **Step 5: Write failing route tests**

Test the exported request handler with:

```ts
const request = new NextRequest("http://localhost/api/locale", {
  method: "POST",
  headers: {
    origin: "http://localhost",
    "content-type": "application/json",
  },
  body: JSON.stringify({ locale: "en" }),
});
```

Assertions:

- valid `en` returns `200`;
- `set-cookie` contains `wedding_locale=en`, `Path=/`, and `SameSite=Lax`;
- `set-cookie` does not contain `Expires` or `Max-Age`;
- invalid locale returns `400`;
- cross-origin request returns `403`.

- [ ] **Step 6: Run route tests and verify RED**

Run: `npm.cmd test -- tests/locale-route.test.ts`

Expected: FAIL because the route does not exist.

- [ ] **Step 7: Implement the locale route**

Use `isSameOrigin(request)`, Zod enum validation, and:

```ts
const response = Response.json({ ok: true });
response.headers.append(
  "Set-Cookie",
  `${localeCookieName}=${locale}; Path=/; SameSite=Lax${
    process.env.NODE_ENV === "production" ? "; Secure" : ""
  }`,
);
return response;
```

Do not add `Expires` or `Max-Age`.

- [ ] **Step 8: Run focused and full tests**

Run:

```powershell
npm.cmd test -- tests/locale.test.ts tests/locale-route.test.ts
npm.cmd test
```

Expected: focused tests pass; existing suite remains green.

- [ ] **Step 9: Commit**

```powershell
git add lib/i18n/locale.ts app/api/locale/route.ts tests/locale.test.ts tests/locale-route.test.ts
git commit -m "feat: add session locale foundation"
```

---

### Task 2: English Defaults and Localized Settings Merge

**Files:**
- Modify: `lib/content/site.ts`
- Modify: `lib/content/settings.ts`
- Create: `lib/i18n/messages.ts`
- Modify: `tests/site-content.test.ts`
- Modify: `tests/site-settings.test.ts`
- Create: `tests/messages.test.ts`

- [ ] **Step 1: Write failing default-content tests**

Add assertions:

```ts
expect(defaultSiteContentByLocale.en.identity).toMatchObject({
  groom: "Hao Wu",
  bride: "Lu Wang",
  title: "Hao Wu & Lu Wang",
});
expect(defaultSiteContentByLocale.en.wedding).toMatchObject({
  city: "Taixing",
  venue: "Hampton by Hilton Taizhou Taixing",
});
expect(defaultSiteContentByLocale.en.navigation.find(
  (item) => item.href === "/guide",
)?.label).toBe("Guest Guide");
```

- [ ] **Step 2: Write failing settings-merge tests**

Test:

```ts
const english = mergeSiteSettings(defaultSiteContentByLocale.en, settings, "en");
expect(english.identity.title).toBe("Custom English Couple");
expect(english.wedding.date).toBe("2026-10-06T12:00:00+08:00");
expect(english.identity.title).not.toBe("中文标题");
```

Use `site.identity` for Chinese, `site.identity.en` for English, and verify shared date/image/link fields apply to both.

- [ ] **Step 3: Run content tests and verify RED**

Run:

```powershell
npm.cmd test -- tests/site-content.test.ts tests/site-settings.test.ts tests/messages.test.ts
```

Expected: FAIL because locale defaults and dictionaries are missing.

- [ ] **Step 4: Add bilingual default content**

Keep:

```ts
export const defaultSiteContent = defaultSiteContentByLocale.zh;
```

for backward compatibility, and add:

```ts
export const defaultSiteContentByLocale: Record<Locale, SiteContent> = {
  zh: chineseSiteContent,
  en: englishSiteContent,
};
```

English content must cover identity, hero, wedding schedule, story, guide, travel, food, transport, navigation, memories, gallery labels, and music title. Reuse all image URLs and external links from Chinese defaults.

- [ ] **Step 5: Add typed fixed UI messages**

Define a nested `PublicMessages` type and export:

```ts
export const publicMessages: Record<Locale, PublicMessages>;
export function getMessages(locale: Locale): PublicMessages;
```

Include header/footer labels, homepage preview copy, page headings, countdown labels, forms, gallery controls, guestbook, guide section introductions, empty states, and accessibility text.

- [ ] **Step 6: Implement locale-aware settings merge**

Change signatures:

```ts
export function mergeSiteSettings(
  base: SiteContent,
  settings: SiteSetting[],
  locale: Locale = "zh",
): SiteContent;

export async function getSiteContent(locale: Locale = "zh"): Promise<SiteContent>;

export async function getAllSiteContent(): Promise<Record<Locale, SiteContent>>;
```

For English, consume `.en` content keys and shared values from existing keys without allowing Chinese text fields to overwrite English defaults.

- [ ] **Step 7: Run focused and full tests**

Run:

```powershell
npm.cmd test -- tests/site-content.test.ts tests/site-settings.test.ts tests/messages.test.ts
npm.cmd test
```

Expected: PASS.

- [ ] **Step 8: Commit**

```powershell
git add lib/content/site.ts lib/content/settings.ts lib/i18n/messages.ts tests/site-content.test.ts tests/site-settings.test.ts tests/messages.test.ts
git commit -m "feat: add bilingual site content"
```

---

### Task 3: Public Layout and Language Switcher

**Files:**
- Create: `components/i18n/language-switcher.tsx`
- Create: `components/i18n/document-locale.tsx`
- Modify: `components/layout/site-header.tsx`
- Modify: `components/layout/site-footer.tsx`
- Modify: `app/(public)/layout.tsx`
- Modify: `app/admin/(dashboard)/layout.tsx`
- Test: `tests/language-switcher.test.tsx`

- [ ] **Step 1: Write failing switcher tests**

Render with `locale="zh"` and assert:

- a group named “选择语言” exists;
- “中文” is selected;
- “EN” is not selected;
- clicking “EN” sends `POST /api/locale` with `{ locale: "en" }`;
- controls disable while pending;
- router refresh is called after success;
- controls re-enable and current language remains selected on failure.

- [ ] **Step 2: Run the switcher test and verify RED**

Run: `npm.cmd test -- tests/language-switcher.test.tsx`

Expected: FAIL because the component is missing.

- [ ] **Step 3: Implement the segmented control**

Use `useTransition`, `useRouter`, and two buttons:

```tsx
<div role="group" aria-label={labels.languageSelector}>
  <button aria-pressed={locale === "zh"}>中文</button>
  <button aria-pressed={locale === "en"}>EN</button>
</div>
```

Post the new locale, call `router.refresh()` on success, and expose visible focus styles.

- [ ] **Step 4: Run the switcher test and verify GREEN**

Run: `npm.cmd test -- tests/language-switcher.test.tsx`

Expected: PASS.

- [ ] **Step 5: Integrate locale into the public layout**

In `app/(public)/layout.tsx`, resolve:

```ts
const locale = await getLocale();
const content = await getSiteContent(locale);
const messages = getMessages(locale);
```

Pass them into header and footer. Render `DocumentLocale` to update `document.documentElement.lang` to `zh-CN` or `en`.

- [ ] **Step 6: Localize header and footer**

Refactor `SiteHeader` to accept `locale`, `navigation`, and `messages`. Place the segmented control on the right. Hide the inactive music button below `md`; keep it available on desktop. Keep the mobile menu button and current navigation behavior.

Refactor `SiteFooter` to accept content and messages rather than fetching Chinese content internally. Keep the admin link labeled in Chinese because it leads to the Chinese-only administration area.

- [ ] **Step 7: Keep admin semantics Chinese**

Wrap the admin dashboard in an element with `lang="zh-CN"` and ensure its client boundary resets document language to Chinese when entering admin.

- [ ] **Step 8: Run focused tests, lint, and typecheck**

Run:

```powershell
npm.cmd test -- tests/language-switcher.test.tsx
npm.cmd run lint
npm.cmd run typecheck
```

Expected: PASS.

- [ ] **Step 9: Commit**

```powershell
git add components/i18n components/layout app/(public)/layout.tsx app/admin/(dashboard)/layout.tsx tests/language-switcher.test.tsx
git commit -m "feat: add public language switcher"
```

---

### Task 4: Localize Home, Story, Details, and Guide

**Files:**
- Modify: `app/(public)/page.tsx`
- Modify: `app/(public)/story/page.tsx`
- Modify: `app/(public)/details/page.tsx`
- Modify: `app/(public)/guide/page.tsx`
- Modify: `components/home/cinematic-hero.tsx`
- Modify: `components/home/countdown.tsx`
- Modify: `components/home/home-preview.tsx`
- Modify: `components/guide/recommendation-section.tsx`
- Modify: `components/guide/transport-section.tsx`
- Modify: `tests/home-preview.test.tsx`
- Create: `tests/countdown-view.test.tsx`

- [ ] **Step 1: Write failing component tests**

Update homepage tests to render English content/messages and expect:

```ts
screen.getByRole("heading", { name: "Guest Guide" });
screen.getByRole("link", { name: "View the Complete Guest Guide" });
screen.getByRole("heading", { name: "We Are Getting Married" });
```

Add countdown test expecting `Days`, `Hours`, `Minutes`, `Seconds`, and English aria-label.

- [ ] **Step 2: Run tests and verify RED**

Run:

```powershell
npm.cmd test -- tests/home-preview.test.tsx tests/countdown-view.test.tsx
```

Expected: FAIL because components do not accept localized labels.

- [ ] **Step 3: Localize homepage components**

Pass `locale` and/or the relevant `messages` sections into hero, countdown, and preview. Move hard-coded preview titles and actions into `publicMessages.home`.

- [ ] **Step 4: Localize server pages**

Each page must call `getLocale()`, `getSiteContent(locale)`, and `getMessages(locale)`. Replace hard-coded Chinese headings, descriptions, buttons, and helper text with dictionary values. Keep editable story, wedding, guide, travel, food, and transport data in `SiteContent`.

Replace title-based icon lookup with stable index or typed item kind so English translations do not break icon selection.

- [ ] **Step 5: Add localized dynamic metadata**

Replace static `metadata` exports with `generateMetadata()` that uses the current locale and page dictionary.

- [ ] **Step 6: Run focused and public tests**

Run:

```powershell
npm.cmd test -- tests/home-preview.test.tsx tests/countdown-view.test.tsx tests/site-content.test.ts
npm.cmd run lint
npm.cmd run typecheck
```

Expected: PASS.

- [ ] **Step 7: Commit**

```powershell
git add app/(public) components/home components/guide tests/home-preview.test.tsx tests/countdown-view.test.tsx
git commit -m "feat: localize wedding information pages"
```

---

### Task 5: Localize RSVP, Guestbook, Gallery, and Memories

**Files:**
- Modify: `app/(public)/rsvp/page.tsx`
- Modify: `app/(public)/guestbook/page.tsx`
- Modify: `app/(public)/gallery/page.tsx`
- Modify: `app/(public)/memories/page.tsx`
- Modify: `components/forms/rsvp-form.tsx`
- Modify: `components/forms/guestbook-form.tsx`
- Modify: `components/guestbook/message-list.tsx`
- Modify: `components/gallery/gallery-access-gate.tsx`
- Modify: `components/gallery/gallery-experience.tsx`
- Modify: `components/gallery/gallery-grid.tsx`
- Modify: `components/gallery/gallery-lightbox.tsx`
- Modify: `tests/rsvp-form.test.tsx`
- Modify: `tests/gallery-experience.test.tsx`
- Create: `tests/guestbook-form.test.tsx`

- [ ] **Step 1: Write failing form and gallery tests**

Add English assertions for:

- RSVP labels, attendance choices, count suffix, submit state, success and network error.
- Guestbook labels, moderation success message, submit state and network error.
- Gallery category controls and lightbox accessibility labels.
- Guest messages remain exactly as submitted regardless of locale.

- [ ] **Step 2: Run focused tests and verify RED**

Run:

```powershell
npm.cmd test -- tests/rsvp-form.test.tsx tests/guestbook-form.test.tsx tests/gallery-experience.test.tsx
```

Expected: FAIL because components only render Chinese.

- [ ] **Step 3: Pass typed message sections into client components**

Use props such as:

```ts
export function RsvpForm({ messages }: { messages: PublicMessages["rsvp"] });
```

Keep API payloads unchanged. When API returns generic server errors, map them to the active locale’s fallback message instead of displaying untranslated server text.

- [ ] **Step 4: Localize the four public pages**

Resolve locale/content/messages server-side. Keep guestbook message values untouched. Localize page headings, privacy copy, gallery access gate, filters, lightbox controls, and memories empty states.

- [ ] **Step 5: Run focused and full tests**

Run:

```powershell
npm.cmd test -- tests/rsvp-form.test.tsx tests/guestbook-form.test.tsx tests/gallery-experience.test.tsx
npm.cmd test
npm.cmd run lint
npm.cmd run typecheck
```

Expected: PASS.

- [ ] **Step 6: Commit**

```powershell
git add app/(public) components/forms components/guestbook components/gallery tests
git commit -m "feat: localize public forms and gallery"
```

---

### Task 6: Bilingual Administration Settings

**Files:**
- Modify: `components/admin/settings-form.tsx`
- Modify: `app/admin/(dashboard)/settings/page.tsx`
- Modify: `app/api/admin/settings/route.ts`
- Modify: `tests/site-settings.test.ts`
- Create: `tests/settings-form.test.tsx`

- [ ] **Step 1: Write failing admin tests**

Assert:

- Chinese and English tabs are visible.
- English fields load `Hao Wu`, `Lu Wang`, and English venue defaults.
- shared date, image, map, hotel, and memories controls render only once.
- submitting English content sends `.en` keys.
- Chinese save does not send or overwrite `.en` keys.
- API schema accepts `site.identity.en` and rejects `site.unknown.en`.

- [ ] **Step 2: Run tests and verify RED**

Run:

```powershell
npm.cmd test -- tests/settings-form.test.tsx tests/site-settings.test.ts
```

Expected: FAIL because the form only accepts one content object and API keys are not allowed.

- [ ] **Step 3: Load both locale contents**

Change the page to:

```ts
const contentByLocale = await getAllSiteContent();
<SettingsForm contentByLocale={contentByLocale} />
```

- [ ] **Step 4: Refactor the settings form**

Split the component into:

- locale tabs;
- `LocalizedSettingsFields` for identity, hero text, wedding descriptive fields, schedule, story, guide, recommendations, transport, and memories text;
- `SharedSettingsFields` for date, image, map/hotel URLs, switches, and media.

Serialize arrays as structured objects, not ad hoc delimited strings. Send each setting through the existing authenticated PATCH endpoint.

- [ ] **Step 5: Extend the settings API allowlist**

Add all explicitly supported Chinese, English, and shared keys from the design. Keep the Zod enum closed so arbitrary keys remain rejected.

- [ ] **Step 6: Revalidate all public and admin paths**

Revalidate `/`, `/story`, `/details`, `/guide`, `/rsvp`, `/gallery`, `/guestbook`, `/memories`, and `/admin/settings`.

- [ ] **Step 7: Run focused and full tests**

Run:

```powershell
npm.cmd test -- tests/settings-form.test.tsx tests/site-settings.test.ts
npm.cmd test
npm.cmd run lint
npm.cmd run typecheck
```

Expected: PASS.

- [ ] **Step 8: Commit**

```powershell
git add components/admin/settings-form.tsx app/admin/(dashboard)/settings/page.tsx app/api/admin/settings/route.ts tests/settings-form.test.tsx tests/site-settings.test.ts
git commit -m "feat: manage bilingual wedding content"
```

---

### Task 7: Localized Photo Metadata

**Files:**
- Create: `supabase/migrations/202606130001_add_photo_translations.sql`
- Modify: `lib/repositories/types.ts`
- Modify: `lib/repositories/demo-repository.ts`
- Modify: `lib/repositories/supabase-repository.ts`
- Modify: `lib/repositories/photo-service.ts`
- Modify: `components/admin/photo-manager.tsx`
- Modify: `app/api/admin/photos/route.ts`
- Modify: `app/api/admin/photos/[id]/route.ts`
- Modify: `app/admin/(dashboard)/photos/page.tsx`
- Modify: `tests/demo-repository.test.ts`
- Modify: `tests/media.test.ts`
- Create: `tests/photo-localization.test.ts`

- [ ] **Step 1: Write failing repository localization tests**

Define expected behavior:

```ts
expect(localizePhoto(photo, "en")).toMatchObject({
  title: "Morning Light",
  description: "The first light in the valley",
});
expect(localizePhoto({ ...photo, titleEn: null }, "en").title).toBe("Wedding Photo");
expect(localizePhoto(photo, "zh").title).toBe(photo.title);
```

- [ ] **Step 2: Run focused tests and verify RED**

Run:

```powershell
npm.cmd test -- tests/photo-localization.test.ts tests/demo-repository.test.ts
```

Expected: FAIL because English photo fields and localization do not exist.

- [ ] **Step 3: Add the migration**

```sql
alter table public.photos
  add column if not exists title_en text
    check (title_en is null or char_length(title_en) between 1 and 120),
  add column if not exists description_en text
    check (description_en is null or char_length(description_en) <= 500);
```

- [ ] **Step 4: Extend repository types and mappings**

Add:

```ts
titleEn: string | null;
descriptionEn: string | null;
```

to `Photo`, `PhotoInput`, and `PhotoUpdate` as appropriate. Map `title_en` and `description_en` in Supabase and seed useful English demo values.

- [ ] **Step 5: Add locale display transformation**

Implement:

```ts
export function localizePhoto(photo: Photo, locale: Locale): Photo {
  if (locale === "zh") return photo;
  return {
    ...photo,
    title: photo.titleEn?.trim() || "Wedding Photo",
    description: photo.descriptionEn?.trim() || "",
  };
}
```

Change `getDisplayPhotos(collection, locale)` to apply it.

- [ ] **Step 6: Extend photo APIs and admin UI**

Create/upload fields:

- Chinese title and description.
- English title and description.

Update existing cards to edit both languages plus category, sort, and public status. Validate lengths server-side and preserve nullable English values.

- [ ] **Step 7: Run focused and full tests**

Run:

```powershell
npm.cmd test -- tests/photo-localization.test.ts tests/demo-repository.test.ts tests/media.test.ts
npm.cmd test
npm.cmd run lint
npm.cmd run typecheck
```

Expected: PASS.

- [ ] **Step 8: Commit**

```powershell
git add supabase/migrations lib/repositories components/admin/photo-manager.tsx app/api/admin/photos app/admin/(dashboard)/photos/page.tsx tests
git commit -m "feat: localize photo metadata"
```

---

### Task 8: End-to-End Coverage and Production Verification

**Files:**
- Modify: `e2e/public.spec.ts`
- Modify: `e2e/visual.spec.ts`
- Update generated baselines: `docs/design/implementation-home-mobile.png`
- Update generated baselines: `docs/design/implementation-home-desktop.png`

- [ ] **Step 1: Write failing Playwright scenarios**

Add scenarios for:

- fresh browser context defaults to Chinese;
- clicking `EN` changes current page to English without changing pathname;
- reload and navigation keep English;
- a new context starts in Chinese;
- English RSVP and guestbook submissions show English success states;
- a Chinese guestbook message remains unchanged in English;
- mobile and desktop switch controls are visible and do not overlap the menu/navigation.

- [ ] **Step 2: Run targeted E2E and verify RED**

Run:

```powershell
npx.cmd playwright test e2e/public.spec.ts --grep "language"
```

Expected: FAIL before final integration is complete or before selectors are added.

- [ ] **Step 3: Complete integration defects found by E2E**

Fix only behavior exposed by the failing scenarios. Add stable `data-testid` values to the language switcher when needed. Do not weaken assertions to match broken behavior.

- [ ] **Step 4: Run all automated verification**

Run:

```powershell
npm.cmd test
npm.cmd run lint
npm.cmd run typecheck
npm.cmd run build
npm.cmd run test:e2e
git diff --check
```

Expected:

- all Vitest files pass;
- ESLint exits `0`;
- TypeScript exits `0`;
- Next.js production build succeeds;
- all Playwright tests pass;
- no whitespace errors.

- [ ] **Step 5: Browser visual verification**

Using the in-app Browser:

- inspect Chinese and English homepage at `390x844`;
- inspect Chinese and English homepage at `1440x900`;
- verify segmented control spacing, menu access, hero text wrapping, long English headings, guide cards, and form controls;
- verify browser console has no warnings or errors;
- reset viewport after verification.

- [ ] **Step 6: Run final diff review**

Run:

```powershell
git status -sb
git diff --stat origin/main...HEAD
git diff --check origin/main...HEAD
```

Confirm only bilingual feature files, migration, tests, docs, and intentional visual baselines changed.

- [ ] **Step 7: Commit final integration**

```powershell
git add -A
git commit -m "test: verify bilingual public experience"
```

- [ ] **Step 8: Push**

```powershell
git push origin HEAD:main
```

Verify local `HEAD`, `origin/main`, and remote `main` resolve to the same commit.
