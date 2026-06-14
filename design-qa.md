# Design QA

- Source visual truth: `.codex-remote-attachments/019eb923-172b-71f2-91f6-7965010f1ef4/9df9dac3-b058-4159-95d4-e84fd27308fb/1-Photo-1.jpg`
- Desktop implementation: `docs/design/implementation-home-desktop.png`
- Mobile implementation: `docs/design/implementation-home-mobile.png`
- Inner-page captures: `docs/design/implementation-guide-mobile.png`, `docs/design/implementation-rsvp-desktop.png`
- Full-view and focused hero comparisons were generated locally for QA and are
  intentionally excluded from version control.
- Viewports: `1440 x 960`, `390 x 844`, plus automated checks at `320`, `768`, and `1024` px
- State: public pages, Chinese locale, initial loaded state

## Full-View Comparison Evidence

The supplied template and desktop implementation were normalized into one
side-by-side image. The implementation keeps the source hierarchy: white fixed
navigation, full-width wedding portrait, prominent names, coral accent, date
language, and a clear transition into the invitation. The approved modern
direction intentionally replaces the source's text directly over photography
with a translucent invitation card for stronger readability.

## Focused Region Evidence

The focused comparison verifies the header, portrait crop, name hierarchy,
signature font, coral palette, invitation surface, and `SAVE THE DATE` line.
The mobile capture separately verifies that the invitation card begins below
the couple's faces and that the header controls remain distinct at narrow
widths.

## Required Fidelity Surfaces

- Fonts and typography: Chinese serif hierarchy is clear; Great Vibes is
  self-hosted and used only for the English signature. English pages use full
  English names with Chinese supporting text.
- Spacing and layout rhythm: the desktop card sits in the lower-left visual
  field; mobile uses a safe portrait crop and overlapping card without covering
  faces. Inner pages share centered headings and a short coral divider.
- Colors and tokens: warm white, white cards, blush borders, and coral accents
  are consistent. Deep coral is used for small text and meets WCAG AA contrast;
  dark text is used on the lighter coral button fill.
- Image quality: the existing real wedding photographs are retained, use
  responsive `next/image` loading, and are not replaced with generated assets.
- Copy and content: names, date, Taixing location, bilingual content, RSVP
  fields, guide details, and guestbook moderation messaging remain intact.
- Interaction and accessibility: mobile navigation, language switching, focus
  rings, reduced motion, gallery controls, and form labels remain functional.

## Findings

### P0

None.

### P1

None.

### P2

None.

### P3

- The implementation contains more functional information in the hero card
  than the reference template. This is intentional because the existing site
  requires countdown and invitation actions above the fold.

## Patches Made During QA

1. Self-hosted Great Vibes to remove build-time Google font downloads.
2. Scoped the romantic theme to public pages so admin styling remains intact.
3. Restored the disabled desktop background-music control.
4. Corrected Chinese and English name hierarchy and used full names.
5. Added the shared coral divider to public inner-page headings.
6. Replaced low-contrast light-coral text and white-on-coral controls with
   WCAG-compliant color pairings.
7. Updated the mobile locale test to open the responsive navigation drawer.
8. Cleared stale Next.js development CSS before final captures.

final result: passed
