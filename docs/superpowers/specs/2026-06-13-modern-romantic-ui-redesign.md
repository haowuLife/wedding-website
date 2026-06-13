# Modern Romantic Public UI Redesign

## Goal

Redesign the complete public wedding website using the selected "modern
romantic" direction inspired by the supplied wedding-template screenshot.
Keep all existing content, bilingual behavior, forms, privacy controls,
database behavior, and routes intact.

The redesign applies only to public pages. The admin interface remains
unchanged so management workflows stay compact and practical.

## Selected Direction

- Visual direction: modern romantic
- Primary name treatment: Chinese names as the main title
- Secondary name treatment: English names as a handwritten signature
- Reference cues: white navigation bar, coral accent color, full-width wedding
  photography, script lettering, prominent date, and "Save the Date" language
- Modernization: lighter hierarchy, translucent information surfaces, restrained
  shadows, better mobile composition, and consistent components across all pages

The result should feel inspired by the reference rather than copied from an
older template.

## Visual System

### Color Palette

- Warm white background: `#fffaf5`
- Pure white surface: `#ffffff`
- Soft blush surface: `#fff0ef`
- Coral primary: `#ef7779`
- Coral dark: `#c85f62`
- Warm ink: `#332b29`
- Muted warm gray: `#7c6f6a`
- Border: `rgba(200, 95, 98, 0.18)`

Champagne gold is removed as the main accent. It may remain only in existing
photography, not as a UI color.

### Typography

- Chinese display and body serif: Noto Serif SC
- English handwritten signature: Great Vibes
- Supporting sans serif: Noto Sans SC or the existing Chinese system sans stack

Chinese names remain the most legible and prominent text on Chinese pages.
English pages use the English names prominently, while the Chinese names become
the supporting line. The handwritten font is used only for names and small
romantic accents, never for paragraphs, navigation, forms, or accessibility
labels.

### Shape and Surface

- Cards use 12–20 px corner radii.
- Primary buttons use full pill shapes.
- Secondary buttons use coral outlines.
- Surfaces use subtle blush borders and very restrained warm shadows.
- Decorative lines use coral rather than champagne gold.
- No CSS-drawn hearts or ornamental illustrations are introduced.

## Header and Navigation

### Desktop

- Fixed white header, approximately 80 px high.
- Left side shows a compact `吴昊 & 王璐` / `Hao Wu & Lu Wang` signature lockup.
- Navigation remains centered.
- Current page is indicated with coral text and a thin coral underline.
- Language switcher remains on the right and adopts the coral palette.
- The disabled music control remains available on desktop.

### Mobile

- Fixed white header, approximately 64 px high.
- Compact couple signature appears on the left.
- Language switcher and menu button remain on the right.
- The existing full-screen navigation drawer remains functional, restyled with
  blush dividers, coral numbering, and larger serif labels.
- No horizontal navigation links appear beside the logo on small screens.

## Home Page

### Hero

Desktop:

- White header sits above the hero rather than floating invisibly over it.
- Hero photograph fills the remaining first viewport.
- Photograph keeps the couple as the focal point and uses only a light
  readability overlay.
- A translucent warm-white invitation card sits in the lower-left portion of
  the photograph.
- The card contains:
  - Chinese couple names as the main title
  - English handwritten signature
  - wedding date and Taixing location
  - `SAVE THE DATE`
  - countdown
  - coral primary invitation button
- A coral circular down control bridges the hero and the next section.

Mobile:

- Hero photograph uses a tall portrait composition.
- Invitation card overlaps the lower portion of the photograph.
- Names, date, countdown, and action remain visible without requiring a scroll.
- The card must not cover either face.

### Home Content

- The invitation introduction becomes a centered "Are Getting Married" section
  with a coral eyebrow, serif title, short paragraph, and date.
- Story, wedding details, and guest guide previews become alternating image and
  copy sections with white space and coral action links.
- Recommendation imagery remains unchanged.
- RSVP closes the page with a blush background and coral button.
- Existing Reveal animations remain, adjusted to shorter travel distances.

## Public Inner Pages

All public inner pages share:

- warm-white page background
- white fixed header
- coral eyebrow
- centered serif page title
- short coral divider
- consistent content width and vertical rhythm
- coral links, buttons, filter pills, and focus states

### Our Story

- Keep the timeline structure.
- Use coral timeline dots and line.
- Alternate photographs and text on desktop.
- Use a single vertical line with white cards on mobile.
- Story dates use the English signature style only when they contain Latin text;
  Chinese dates use the serif font.

### Wedding Details

- Date, luncheon, and venue summary become three white cards.
- Location and schedule use a balanced two-column layout on desktop.
- Timeline rows gain coral time labels and blush separators.
- Map and hotel actions use primary and secondary coral buttons.

### RSVP

- Use a white form card with a blush border and soft shadow.
- Selected attendance option uses a coral background.
- Inputs retain visible labels and use coral focus borders.
- Success view uses the existing icon and localized text with coral styling.
- No removed child, parking, or dietary fields return.

### Gallery

- Category filters become coral pills.
- Existing masonry layout and lightbox behavior stay unchanged.
- Hover overlay becomes warm black with coral title accent.
- Access-code screen uses the same white card treatment as RSVP.

### Guest Guide

- Core guide items become three white icon cards.
- Travel and food recommendations use image cards with coral labels and actions.
- Transport remains the final major content section.
- Holiday congestion apology becomes a distinct blush note card.
- Existing real photographs and links remain unchanged.

### Guestbook

- Form and approved messages use paired white cards on desktop.
- Guest messages remain in their submitted language.
- Moderation behavior and public visibility rules remain unchanged.

### Memories

- Keep the existing feature flag and hidden state.
- When enabled, reuse gallery styling for photographs and white framed video
  cards.

## Footer

- Footer becomes white with a thin blush border.
- Couple names appear as a serif title with the English handwritten signature.
- Date and location remain visible.
- RSVP and guestbook links use coral.
- Admin link remains visually quiet.

## Motion

- Hero photograph keeps a very slow scale animation.
- Invitation card enters with a small fade and upward movement.
- Content sections use restrained fade-and-rise animation.
- Button hover movement is limited to 1–2 px.
- All effects honor `prefers-reduced-motion`.

## Responsive Rules

- Mobile-first implementation.
- No horizontal overflow at 320, 375, 390, 768, 1024, or 1440 px.
- Text must remain readable over photographs without heavy dark overlays.
- Header controls must fit at 320 px.
- All tap targets remain at least 44 px high where practical.
- Hero composition must be visually checked at mobile and desktop aspect ratios.

## Accessibility

- Preserve semantic headings, labels, navigation landmarks, and dialog roles.
- Coral text must meet contrast requirements on warm-white surfaces.
- Focus rings use coral dark with sufficient offset.
- Handwritten fonts are decorative only and never the sole accessible label.
- Existing keyboard and reduced-motion behavior remains intact.

## Technical Scope

Expected primary areas:

- `app/globals.css`
- public layout header and footer components
- home hero, countdown, and preview components
- public page wrappers and major presentation components
- form, gallery, guide, and timeline presentation classes
- typography setup through Next.js font loading

No database schema, API contract, authentication, RSVP behavior, bilingual
content model, or admin behavior changes are required.

## Validation

- Existing unit tests remain green.
- Existing bilingual E2E test remains green.
- Add or update assertions only where visual structure changes affect stable
  selectors.
- Run production build, lint, typecheck, unit tests, and E2E tests.
- Capture and compare mobile and desktop screenshots against the selected
  direction.
- Complete a visual QA pass for hero crop, header fit, typography, spacing,
  contrast, and horizontal overflow.

