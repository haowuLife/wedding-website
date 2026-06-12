# Personal Wedding Website Design

## 1. Product Goal

Build a mobile-first personal wedding website for invitations, storytelling,
RSVP collection, guest guidance, moderated wishes, photo sharing, and
post-wedding memories. The public experience should feel calm, premium, and
romantic. Private guest data and administrative actions must remain
server-protected.

## 2. Confirmed Visual Direction

The selected direction is **Airy Romantic Film / 晨光诗意**.

- Base colors: warm ivory, champagne gold, pale stone gray, and muted sage
  sourced from photography.
- Typography: one high-contrast serif for names and editorial headings, plus
  one readable Chinese sans-serif for body copy and controls.
- Layout: generous whitespace, full-bleed photography, light dividers, and
  almost no card-heavy UI.
- Motion: restrained Framer Motion reveals, soft section transitions, and a
  cinematic cover image that slowly pushes in.
- Cover depth: the background photo, veil/foreground, copy, and light particles
  move at subtly different speeds.
- Accessibility: `prefers-reduced-motion` disables the push-in, parallax, and
  decorative particles. Low-power/mobile fallback is a static optimized image.
- Music: opt-in only. The site never auto-plays audible media.

Selected visual reference:
`docs/design/selected-airy-romantic-film.png`

## 3. Technical Direction

### Application

- Next.js App Router with React and TypeScript.
- Tailwind CSS for design tokens and responsive styling.
- Framer Motion for cover and section animation.
- Server Components by default; Client Components only for interactive
  controls, forms, countdowns, lightboxes, and motion.
- Vercel as the primary deployment target.

### Platform Services

- Supabase PostgreSQL for application data.
- Supabase Auth for administrator email/password login.
- Supabase Storage private bucket for all wedding photographs.
- Short-lived signed image URLs generated on the server.
- Cloudflare Pages/R2 remain documented alternatives, but the first working
  implementation targets Supabase and Vercel to avoid duplicating platform
  adapters before they are needed.

### Testing

- Vitest for domain logic, validation, access-code behavior, CSV generation,
  and server action helpers.
- React Testing Library for forms and interactive components.
- Playwright for the RSVP happy path, guestbook moderation visibility, and
  administrator authentication guard.

## 4. Information Architecture

### Public Routes

- `/`: cinematic home cover and invitation entry point.
- `/story`: relationship timeline.
- `/details`: date, venue, schedule, and map navigation.
- `/rsvp`: guest response form and success state.
- `/gallery`: categorized photo gallery with optional access-code gate.
- `/guide`: transportation, parking, accommodation, dress code, and contacts.
- `/guestbook`: approved messages and new-message form.
- `/memories`: post-wedding photos and videos; returns `notFound()` while the
  feature flag is disabled.

The mobile navigation uses a compact menu sheet. Desktop navigation is visible
inline. The primary flow is Home -> Invitation -> Details -> RSVP.

### Administrator Routes

- `/admin/login`: Supabase Auth login.
- `/admin`: RSVP and attendance summary.
- `/admin/guests`: searchable and filterable RSVP list with CSV export.
- `/admin/messages`: approve, hide, or delete guestbook messages.
- `/admin/photos`: upload, delete, publish, reorder, and categorize photos.
- `/admin/settings`: update names, date, venue, copy, hero media, navigation,
  gallery access, and memories visibility.

All `/admin/*` routes except login require an authenticated administrator.
Authorization checks happen on the server and are repeated inside mutations.

## 5. Public Experience

### Home

- Full-height optimized hero photograph.
- Couple names, Gregorian wedding date, optional lunar-date label, countdown,
  invitation CTA, music toggle, menu, and scroll cue.
- The dynamic cover uses a 12-18 second `scale(1)` to `scale(1.06)` loop with
  subtle foreground parallax and opacity-only light particles.
- `next/image` supplies responsive AVIF/WebP variants and a blur placeholder.
- Below the cover, concise preview sections link to story, details, gallery,
  RSVP, and guestbook.

### Story

- Vertical mobile timeline and alternating desktop timeline.
- Each item has date, title, copy, image, and sort order.
- Images reveal with a small vertical translation and opacity transition.

### Wedding Details

- Date, ceremony time, reception time, hotel name, and full address.
- Ordered wedding-day schedule.
- Navigation links use provider-specific HTTPS URLs rather than custom schemes
  when possible.

### RSVP

- Fields: name, phone, attendance, guest count, children, parking, dietary
  restrictions, and message.
- Conditional fields are disabled or reset when attendance is declined.
- Submission returns a dedicated thank-you state without exposing guest data.
- Re-submission with the same normalized phone updates the existing RSVP using
  a server-side operation.

### Gallery

- Category tabs and responsive two-column mobile masonry-like grid.
- Lightbox supports swipe, keyboard navigation, close, and image captions.
- Optional access code is verified server-side against a hash. Successful
  verification creates a short-lived, HTTP-only signed session cookie.

### Guest Guide

- Structured sections for transport, parking, accommodation, dress code, and
  contacts.
- Phone and map actions use accessible text labels and safe external links.

### Guestbook

- Public queries return only approved messages.
- New messages are stored with `is_approved = false`.
- The success state clearly explains that the message will appear after review.

### Memories

- Hidden by default through `site_settings.memories.enabled`.
- Once enabled, supports wedding-day photo sections and externally hosted video
  embeds or uploaded video metadata.

## 6. Data Model

### `guests`

- `id uuid primary key default gen_random_uuid()`
- `name text not null`
- `phone text not null`
- `phone_normalized text not null unique`
- `attending boolean not null`
- `guest_count integer not null default 1 check (guest_count between 0 and 10)`
- `has_children boolean not null default false`
- `need_parking boolean not null default false`
- `dietary_restrictions text`
- `message text`
- `created_at timestamptz not null default now()`
- `updated_at timestamptz not null default now()`

### `messages`

- `id uuid primary key default gen_random_uuid()`
- `name text not null`
- `message text not null`
- `is_approved boolean not null default false`
- `is_hidden boolean not null default false`
- `created_at timestamptz not null default now()`

### `photos`

- `id uuid primary key default gen_random_uuid()`
- `title text not null`
- `description text`
- `image_url text not null` stores the private Storage object path
- `category text not null`
- `sort_order integer not null default 0`
- `is_public boolean not null default false`
- `collection text not null default 'gallery'`
- `media_type text not null default 'image'`
- `created_at timestamptz not null default now()`

### `site_settings`

- `id uuid primary key default gen_random_uuid()`
- `key text not null unique`
- `value jsonb not null`
- `updated_at timestamptz not null default now()`

### `form_rate_limits`

- Stores a SHA-256 hash of IP plus form scope, request count, and expiry.
- Raw IP addresses are never persisted.
- Cleanup is handled by a scheduled SQL function or opportunistically during
  submissions.

### Settings Keys

- `site.identity`
- `site.hero`
- `site.wedding`
- `site.story`
- `site.guide`
- `site.navigation`
- `gallery.access`
- `memories.enabled`
- `music.track`

## 7. Security and Privacy

- Browser code receives only the Supabase project URL and anonymous key.
- `SUPABASE_SERVICE_ROLE_KEY` is server-only and never uses a
  `NEXT_PUBLIC_` prefix.
- RLS denies public access to `guests`, unapproved `messages`, private `photos`,
  rate-limit records, and sensitive settings.
- Public read policies expose approved messages and published metadata only
  through restricted server queries.
- Administrator mutations require a valid Supabase Auth session and an
  administrator allowlist or `app_metadata.role = 'admin'`.
- Forms use Zod validation, length limits, normalized phone numbers, honeypot
  fields, same-origin checks, and IP-hash rate limiting.
- CSV export is generated only after server-side administrator authorization.
- Uploaded files are validated by MIME type, extension, and size. Storage names
  use generated UUIDs rather than user-provided paths.
- HTML is never accepted from public forms. Text is rendered escaped.
- Security headers include CSP, `X-Content-Type-Options`, referrer policy, and
  frame restrictions.

## 8. Server Boundaries and Data Flow

1. Public Server Components fetch safe site settings and published content.
2. RSVP and guestbook Client Components submit to Next.js route handlers.
3. Route handlers validate origin, honeypot, rate limit, and Zod schemas.
4. Authorized server clients write to Supabase using server-only credentials.
5. Admin pages read the authenticated session before querying private data.
6. Photo requests resolve private object paths to short-lived signed URLs.
7. Mutations call `revalidatePath()` for affected public/admin routes.

No database keys, private rows, or reusable Storage URLs are returned to public
clients.

## 9. Error Handling

- Field errors are returned as structured validation results.
- Rate-limit responses use HTTP 429 with a retry message.
- Database conflicts return a neutral retry message without leaking internals.
- Missing or disabled content uses intentional empty states.
- Failed image loads show an ivory fallback surface and alt text.
- Admin mutations use confirm dialogs for destructive actions and display
  operation-specific toast feedback.
- Server logs contain request IDs and sanitized error context, never phone
  numbers, messages, access codes, or secrets.

## 10. Performance and Accessibility

- Mobile layout is the baseline; desktop styles are enhancements.
- Hero image gets priority loading; below-fold images are lazy-loaded.
- Gallery uses responsive sizes and avoids loading full-resolution originals in
  the grid.
- Fonts use `next/font` and limited weights.
- Motion is transform/opacity based and disabled for reduced-motion users.
- Forms have visible labels, clear focus states, input modes, and error
  association.
- Lightbox and menu sheet trap focus and close on Escape.
- Color contrast targets WCAG AA.

## 11. Delivery Structure

The implementation proceeds in independently testable stages:

1. Project foundation, theme tokens, shared layout, and selected visual asset.
2. Public content pages and cinematic home cover.
3. Supabase schema, RLS, typed clients, and seed settings.
4. RSVP and guestbook validation, routes, anti-spam, and success states.
5. Authenticated admin shell, RSVP dashboard, filters, and CSV export.
6. Message moderation, photo management, signed media, and settings editor.
7. Memories feature flag, deployment documentation, end-to-end tests, and
   production verification.

## 12. Acceptance Criteria

- All requested public and administrator routes are implemented.
- RSVP records are never publicly readable.
- Guestbook messages are invisible until approved.
- Admin routes and mutations require authentication.
- Gallery access code does not expose permanent private image URLs.
- Memories remains inaccessible until enabled.
- The selected dynamic cover matches the airy romantic visual direction and
  degrades correctly for reduced motion.
- Unit, component, and critical Playwright tests pass.
- Production build succeeds and setup/deployment instructions cover Supabase
  and Vercel.
